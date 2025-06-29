export function renderContactPage() {
    const pageContent = document.getElementById('page-content');
    
    pageContent.innerHTML = `
        <div class="contact-container">
            <p class="contact-text">
                If you notice any missing or outdated information contact me via email or Telegram:
            </p>
            
            <div class="contact-links">
                <div class="contact-item">
                    <span class="contact-icon">✉️</span>
                    <a href="mailto:hello@hanki.dev" class="text-link">hello@hanki.dev</a>
                </div>
                
                <div class="contact-item">
                    <span class="contact-icon">💬</span>
                    <a href="https://t.me/h4nki" target="_blank" rel="noopener noreferrer" class="text-link">
                        Telegram: @h4nki
                    </a>
                </div>
            </div>
        </div>
    `;
}