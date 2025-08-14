// Callout 警告框增强器
(function() {
    function enhanceCallouts() {
        // 查找所有 blockquote 元素
        const blockquotes = document.querySelectorAll('blockquote');
        
        blockquotes.forEach(function(blockquote) {
            // 检查第一个段落是否包含 callout 标记
            const firstParagraph = blockquote.querySelector('p:first-child');
            if (firstParagraph) {
                const text = firstParagraph.textContent;
                
                // 匹配 [!TYPE] 格式
                const calloutMatch = text.match(/\[!(IMPORTANT|CAUTION|NOTE|SUCCESS|WARNING)\]/i);
                
                if (calloutMatch) {
                    const calloutType = calloutMatch[1].toLowerCase();
                    
                    // 添加 data-callout 属性
                    blockquote.setAttribute('data-callout', calloutType);
                    
                    // 移除第一个段落中的 [!TYPE] 标记
                    const cleanText = text.replace(/\[![^\]]+\]\s*/, '');
                    firstParagraph.textContent = cleanText;
                    
                    // 添加图标和标题
                    const calloutHeader = document.createElement('div');
                    calloutHeader.className = 'callout-header';
                    calloutHeader.style.cssText = `
                        display: block;
                        font-weight: bold;
                        margin-bottom: 8px;
                        font-size: 14px;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    `;
                    
                    // 根据类型设置样式
                    const calloutConfig = {
                        important: {
                            icon: '⚠️',
                            text: '重要',
                            color: '#7835dc'
                        },
                        caution: {
                            icon: '⚠️',
                            text: '注意',
                            color: '#b8860b'
                        },
                        note: {
                            icon: 'ℹ️',
                            text: '提示',
                            color: '#17a2b8'
                        },
                        success: {
                            icon: '✅',
                            text: '成功',
                            color: '#28a745'
                        },
                        warning: {
                            icon: '🚨',
                            text: '警告',
                            color: '#fd7e14'
                        }
                    };
                    
                    const config = calloutConfig[calloutType];
                    if (config) {
                        calloutHeader.innerHTML = `${config.icon} ${config.text}`;
                        calloutHeader.style.color = config.color;
                        
                        // 在第一个段落之前插入标题
                        firstParagraph.parentNode.insertBefore(calloutHeader, firstParagraph);
                    }
                }
            }
        });
    }
    
    // 页面加载完成后执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', enhanceCallouts);
    } else {
        enhanceCallouts();
    }
    
    // 如果页面使用了PJAX，需要重新执行
    if (window.pjax) {
        document.addEventListener('pjax:end', enhanceCallouts);
    }
    
    // 监听动态内容变化
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                enhanceCallouts();
            }
        });
    });
    
    // 开始观察
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
