import { ThemeColor } from "@/constants/theme";

export const createHtmlContent = (htmlContent: string, colors: ThemeColor) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-size: 16px;
              line-height: 1.8;
              color: #333;
              padding: 16px;
              background-color: ${colors.card};
              word-wrap: break-word;
              overflow-wrap: break-word;
              color: ${colors.text};
            }
            
            div {
              margin-bottom: 16px;
            }
            
            h1, h2, h3, h4, h5, h6 {
              margin-bottom: 12px;
              margin-top: 20px;
              font-weight: bold;
              line-height: 1.4;
            }
            
            h1 { font-size: 24px; }
            h2 { font-size: 22px; }
            h3 { font-size: 20px; }
            h4 { font-size: 18px; }
            
            p {
              margin-bottom: 16px;
              line-height: 1.8;
            }
            
            strong, b {
              font-weight: bold;
            }
            
            ul, ol {
              margin-left: 20px;
              margin-bottom: 16px;
            }
            
            li {
              margin-bottom: 8px;
              line-height: 1.6;
            }
            
            a {
              color: #00D9B5;
              text-decoration: none;
            }
            
            img {
              max-width: 100%;
              height: auto;
              border-radius: 8px;
              margin: 16px 0;
            }
            
            blockquote {
              border-left: 4px solid #00D9B5;
              padding-left: 16px;
              margin: 16px 0;
              font-style: italic;
              color: #666;
            }
            
            /* Cho phép select text */
            body {
              -webkit-user-select: text;
              user-select: text;
            }
            
            /* Remove các class không cần thiết từ Facebook */
            .xdj266r, .x14z9mp, .xat24cr, .x1lziwak, .x1vvkbs, .x126k92a, .xtlvy1s {
              /* Reset các style này */
            }
          </style>
          
          <script>
            // Gửi height của content về React Native
            function sendHeight() {
              const height = document.body.scrollHeight;
              
              window.ReactNativeWebView.postMessage(JSON.stringify({ 
                type: 'height', 
                height: height + 24 // Thêm padding để tránh bị cắt content
              }));
            }
            
            // Gọi khi document load xong
            window.addEventListener('load', function() {
              sendHeight();
              // Gọi lại sau một thời gian ngắn để chắc chắn
              setTimeout(sendHeight, 100);
              setTimeout(sendHeight, 300);
              setTimeout(sendHeight, 500);
            });
            
            // Theo dõi thay đổi kích thước
            if (window.ResizeObserver) {
              const resizeObserver = new ResizeObserver(sendHeight);
              resizeObserver.observe(document.body);
            }
          </script>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;
};