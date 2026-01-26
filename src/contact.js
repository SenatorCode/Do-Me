import { createAttributionFooter } from './attribution.js';

export function loadContact() {
    const content = document.getElementById('content');
    content.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'contact-container';

    // Contact Banner
    const banner = document.createElement('section');
    banner.className = 'contact-banner';
    banner.innerHTML = `
        <div class="banner-overlay">
            <h1>Contact Us</h1>
            <p>We'd love to hear from you. Book a table or drop by for a visit.</p>
        </div>
    `;

    // Contact Content
    const contactContent = document.createElement('section');
    contactContent.className = 'contact-content';
    contactContent.innerHTML = `
        <div class="contact-grid">
            <div class="contact-info">
                <h2>Get in Touch</h2>
                <p class="intro">Have a question about our menu or want to host an event? Reach out to us directly or visit us at our Food District location.</p>
                
                <div class="info-cards">
                    <div class="info-card">
                        <div class="icon-circle">
                            <span class="material-icons-outlined">location_on</span>
                        </div>
                        <div class="info-text">
                            <h4>Visit Us</h4>
                            <p>123 Random Address in the world</p>
                        </div>
                    </div>
                    <div class="info-card">
                        <div class="icon-circle">
                            <span class="material-icons-outlined">phone</span>
                        </div>
                        <div class="info-text">
                            <h4>Call Us</h4>
                            <p>(111) 111-11111</p>
                        </div>
                    </div>
                    <div class="info-card">
                        <div class="icon-circle">
                            <span class="material-icons-outlined">email</span>
                        </div>
                        <div class="info-text">
                            <h4>Email Us</h4>
                            <p>example@saffronbistro.com</p>
                        </div>
                    </div>
                </div>

                <div class="map-container">
                    <div class="map-placeholder">
                        <button class="map-btn">
                            <span class="material-icons">location_on</span>
                            Open in Maps
                        </button>
                    </div>
                </div>
            </div>

            <div class="hours-section">
                <div class="hours-card">
                    <div class="hours-header">
                        <span class="material-icons-outlined">schedule</span>
                        <h3>Opening Hours</h3>
                    </div>
                    <table class="hours-table">
                        <tr>
                            <td>Monday</td>
                            <td>11:00 AM - 10:00 PM</td>
                        </tr>
                        <tr>
                            <td>Tuesday</td>
                            <td>11:00 AM - 10:00 PM</td>
                        </tr>
                        <tr>
                            <td>Wednesday</td>
                            <td>11:00 AM - 10:00 PM</td>
                        </tr>
                        <tr>
                            <td>Thursday</td>
                            <td>11:00 AM - 10:00 PM</td>
                        </tr>
                        <tr>
                            <td>Friday</td>
                            <td class="highlight">11:00 AM - 11:00 PM</td>
                        </tr>
                        <tr>
                            <td>Saturday</td>
                            <td class="highlight">11:00 AM - 11:00 PM</td>
                        </tr>
                        <tr>
                            <td>Sunday</td>
                            <td>12:00 PM - 9:30 PM</td>
                        </tr>
                    </table>
                    <div class="hours-note">
                        <span class="material-icons-outlined">info</span>
                        <p>Kitchen closes 30 minutes before closing time. Holiday hours may vary.</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Footer
    const footer = document.createElement('footer');
    footer.className = 'contact-footer';
    footer.innerHTML = `
        <div class="footer-content">
            <div class="footer-brand">
                <h3>The Saffron Bistro</h3>
            </div>
            <div class="footer-copyright">
                <p>© 2026 The Saffron Bistro. All rights reserved.</p>
            </div>
            <div class="footer-social">
                <span class="material-icons">facebook</span>
                <span class="material-icons">photo_camera</span>
                <span class="material-icons">alternate_email</span>
            </div>
        </div>
    `;

    container.appendChild(banner);
    container.appendChild(contactContent);
    container.appendChild(footer);
    container.appendChild(createAttributionFooter());
    content.appendChild(container);

    // Map button functionality
    const mapBtn = container.querySelector('.map-btn');
    if (mapBtn) {
        mapBtn.addEventListener('click', () => {
            window.open('#', '_blank');
        });
    }
}
