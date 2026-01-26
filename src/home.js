import homeImage from './assets/images/home.jpg';
import { createAttributionFooter } from './attribution.js';

export function loadHome() {
    const content = document.getElementById('content');
    content.innerHTML = '';

    // Create main container
    const container = document.createElement('div');
    container.className = 'home-container';

    // Hero Section
    const heroSection = document.createElement('section');
    heroSection.className = 'hero-section';
    heroSection.innerHTML = `
        <div class="text-column">
            <span class="established">ESTABLISHED 1904</span>
            <h1>The Saffron Bistro</h1>
            <h3 class="tagline">Authentic Flavors, Timeless Memories.</h3>
            <p>Experience the warmth of farm-to-table dining where every dish tells a story. We believe in sustainable sourcing, traditional techniques, and the joy of shared meals.</p>
            <div class="buttons">
                <button type="button" class="book-table">Book a Table</button>
                <button type="button" class="view-menu">View Menu</button>
            </div>
            <div class="icons">
                <div class="icon-item">
                    <span class="material-icons-outlined">eco</span>
                    <span class="text">Locally Sourced</span>
                </div>
                <div class="icon-item">
                    <span class="material-icons-outlined">restaurant_menu</span>
                    <span class="text">Seasonal Menu</span>
                </div>
            </div>
        </div>
        <div class="hero-image">
            <img src="${homeImage}" alt="A Cozy Interior of a restaurant with dimmed light">
        </div>
    `;

    // Philosophy Section
    const philosophySection = document.createElement('section');
    philosophySection.className = 'philosophy';
    philosophySection.innerHTML = `
        <h2>Our Philosophy</h2>
        <p class="philosophy-text">We bring the freshest ingredients straight from local farms to your plate, ensuring quality in every bite.</p>
        <div class="cards">
            <div class="card">
                <div class="card-icon farm-fresh">
                    <span class="material-icons-outlined">local_florist</span>
                </div>
                <h4>Farm Fresh</h4>
                <p>Sourced daily from local growers to ensure the highest nutrient content and best flavor.</p>
            </div>
            <div class="card">
                <div class="card-icon sustainable">
                    <span class="material-icons-outlined">eco</span>
                </div>
                <h4>Sustainable</h4>
                <p>Eco-friendly practices in every step of our process, from sourcing to waste management.</p>
            </div>
            <div class="card">
                <div class="card-icon traditional">
                    <span class="material-icons-outlined">menu_book</span>
                </div>
                <h4>Traditional</h4>
                <p>Recipes passed down through generations, preserving the authentic taste of our heritage.</p>
            </div>
        </div>
    `;

    // Footer Section
    const footer = document.createElement('footer');
    footer.className = 'home-footer';
    footer.innerHTML = `
        <div class="footer-content">
            <div class="footer-brand">
                <h3>The Saffron Bistro</h3>
                <p>Authentic Flavors, Timeless Memories.</p>
            </div>
            <div class="footer-icons">
                <span class="material-icons">star</span>
                <span class="material-icons">favorite</span>
            </div>
            <div class="footer-copyright">
                <p>© 2026 The Saffron Bistro. All rights reserved.</p>
            </div>
        </div>
    `;

    container.appendChild(heroSection);
    container.appendChild(philosophySection);
    container.appendChild(footer);
    container.appendChild(createAttributionFooter());
    content.appendChild(container);

    // Add event listener for View Menu button
    const viewMenuBtn = container.querySelector('.view-menu');
    if (viewMenuBtn) {
        viewMenuBtn.addEventListener('click', () => {
            const menuBtn = document.querySelector('[data-tab="menu"]');
            if (menuBtn) menuBtn.click();
        });
    }
}
