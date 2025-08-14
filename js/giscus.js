// Giscus评论系统加载脚本
(function() {
    // 等待页面完全加载
    function initGiscus() {
        // 检查是否在文章页面
        const isArticlePage = document.querySelector('.article') || 
                             document.querySelector('.content') || 
                             document.querySelector('.post') ||
                             document.querySelector('.column-main') ||
                             window.location.pathname.includes('/2025/');
        
        if (isArticlePage) {
            console.log('检测到文章页面，正在加载Giscus评论系统...');
            
            // 检查是否已经加载过评论
            if (document.getElementById('giscus-comments')) {
                console.log('评论系统已存在，跳过重复加载');
                return;
            }
            
            // 创建Giscus容器
            const giscusContainer = document.createElement('div');
            giscusContainer.id = 'giscus-comments';
            giscusContainer.style.marginTop = '40px';
            giscusContainer.style.padding = '20px';
            giscusContainer.style.borderTop = '1px solid #eaecef';
            giscusContainer.style.background = '#ffffff';
            giscusContainer.style.borderRadius = '8px';
            giscusContainer.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            
            // 添加加载状态
            giscusContainer.innerHTML = `
                <h3 style="margin: 0 0 20px 0; color: #24292e; font-size: 20px; font-weight: 600; text-align: center;">
                    💬 评论
                </h3>
                <div class="giscus-loading" style="text-align: center; padding: 40px; color: #6a737d;">
                    🔄 正在加载评论...
                </div>
            `;
            
            // 查找文章内容区域并插入评论框
            const articleContent = document.querySelector('.article') || 
                                  document.querySelector('.content') || 
                                  document.querySelector('.post') ||
                                  document.querySelector('.column-main') ||
                                  document.querySelector('main') ||
                                  document.querySelector('article');
            
            if (articleContent) {
                articleContent.appendChild(giscusContainer);
                
                // 延迟加载Giscus脚本，确保页面完全渲染
                setTimeout(function() {
                    try {
                        // 加载Giscus脚本
                        const script = document.createElement('script');
                        script.src = 'https://giscus.app/client.js';
                        script.setAttribute('data-repo', 'rookie-zgy1513/rookie-zgy1513.github.io');
                        script.setAttribute('data-repo-id', 'R_kgDOKRlxNA');
                        script.setAttribute('data-category', 'General');
                        script.setAttribute('data-category-id', 'DIC_kwDOKRlxNM4CuKH8');
                        script.setAttribute('data-mapping', 'pathname');
                        script.setAttribute('data-strict', '0');
                        script.setAttribute('data-reactions-enabled', '1');
                        script.setAttribute('data-emit-metadata', '0');
                        script.setAttribute('data-input-position', 'bottom');
                        script.setAttribute('data-theme', 'preferred_color_scheme');
                        script.setAttribute('data-lang', 'zh-CN');
                        script.crossOrigin = 'anonymous';
                        script.async = true;
                        
                        // 脚本加载成功后的处理
                        script.onload = function() {
                            console.log('Giscus脚本加载成功');
                            // 移除加载状态
                            const loadingElement = giscusContainer.querySelector('.giscus-loading');
                            if (loadingElement) {
                                loadingElement.remove();
                            }
                        };
                        
                        // 脚本加载失败的处理
                        script.onerror = function() {
                            console.error('Giscus脚本加载失败');
                            giscusContainer.innerHTML = `
                                <h3 style="margin: 0 0 20px 0; color: #24292e; font-size: 20px; font-weight: 600; text-align: center;">
                                    💬 评论
                                </h3>
                                <div style="text-align: center; padding: 40px; color: #7835dc;">
                                    ❌ 评论系统加载失败，请刷新页面重试
                                </div>
                            `;
                        };
                        
                        giscusContainer.appendChild(script);
                        
                    } catch (error) {
                        console.error('加载Giscus时发生错误:', error);
                        giscusContainer.innerHTML = `
                            <h3 style="margin: 0 0 20px 0; color: #24292e; font-size: 20px; font-weight: 600; text-align: center;">
                                💬 评论
                            </h3>
                            <div style="text-align: center; padding: 40px; color: #7835dc;">
                                ❌ 评论系统加载失败: ${error.message}
                            </div>
                        `;
                    }
                }, 1500); // 延迟1.5秒加载
                
            } else {
                console.warn('未找到文章内容区域，无法加载评论系统');
            }
        } else {
            console.log('非文章页面，跳过评论系统加载');
        }
    }
    
    // 多重检查确保页面加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGiscus);
    } else {
        // 如果DOM已经加载完成，等待一小段时间再执行
        setTimeout(initGiscus, 100);
    }
    
    // 额外检查，确保在Icarus主题完全加载后执行
    window.addEventListener('load', function() {
        setTimeout(initGiscus, 500);
    });
    
    // 如果页面使用了PJAX，需要重新初始化
    if (window.pjax) {
        document.addEventListener('pjax:end', function() {
            setTimeout(initGiscus, 300);
        });
    }
})();
