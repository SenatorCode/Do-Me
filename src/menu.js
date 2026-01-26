import lemonadeImg from './assets/images/saffron-lemonade.png';
import wineImg from './assets/images/pinot-noir.png';
import sodaImg from './assets/images/italian-soda.png';
import { createAttributionFooter } from './attribution.js';

export function loadMenu() {
    const content = document.getElementById('content');
    content.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'menu-container';

    // Menu Banner
    const banner = document.createElement('section');
    banner.className = 'menu-banner';
    banner.innerHTML = `
        <div class="banner-overlay">
            <h1>Our Menu</h1>
            <p>Experience a symphony of flavors crafted with passion and the finest seasonal ingredients.</p>
        </div>
    `;

    // Menu Categories Navigation
    const categoriesNav = document.createElement('div');
    categoriesNav.className = 'menu-categories';
    categoriesNav.innerHTML = `
        <div class="category-tabs">
            <button class="category-tab active" data-category="small-plates">Small Plates</button>
            <button class="category-tab" data-category="main-courses">Main Courses</button>
            <button class="category-tab" data-category="refreshments">Refreshments</button>
        </div>
        <div class="dietary-legend">
            <span class="legend-item"><span class="tag veg">VEG</span> Vegetarian</span>
            <span class="legend-item"><span class="tag spicy">SPICY</span> Spicy</span>
            <span class="legend-item"><span class="tag gf">GF</span> Gluten Free</span>
        </div>
    `;

    // Menu Content
    const menuContent = document.createElement('div');
    menuContent.className = 'menu-content';

    // Small Plates Section
    const smallPlates = document.createElement('section');
    smallPlates.className = 'menu-section';
    smallPlates.id = 'small-plates';
    smallPlates.innerHTML = `
        <h2>Small Plates</h2>
        <div class="menu-grid">
            <div class="menu-item">
                <div class="item-header">
                    <h3>Bruschetta Al Pomodoro</h3>
                    <span class="price">$12</span>
                </div>
                <p>Grilled sourdough rubbed with garlic and topped with diced heirloom tomatoes, fresh basil, and extra virgin olive oil.</p>
                <span class="tag veg">VEG</span>
            </div>
            <div class="menu-item">
                <div class="item-header">
                    <h3>Crispy Calamari</h3>
                    <span class="price">$16</span>
                </div>
                <p>Tender squid rings lightly fried until golden, served with a side of zesty marinara sauce and charred lemon wedges.</p>
                <span class="tag mild">MILD</span>
            </div>
            <div class="menu-item">
                <div class="item-header">
                    <h3>Tuna Tartare</h3>
                    <span class="price">$18</span>
                </div>
                <p>Fresh yellowfin tuna cubes, avocado mousse, sesame seeds, and a soy-ginger reduction served with crispy wonton chips.</p>
                <span class="tag gf">GF</span>
            </div>
            <div class="menu-item">
                <div class="item-header">
                    <h3>Burrata Caprese</h3>
                    <span class="price">$15</span>
                </div>
                <p>Creamy burrata cheese served with roasted cherry tomatoes, pesto drizzle, balsamic glaze, and pine nuts.</p>
                <span class="tag veg">VEG</span> <span class="tag gf">GF</span>
            </div>
        </div>
    `;

    // Main Courses Section
    const mainCourses = document.createElement('section');
    mainCourses.className = 'menu-section';
    mainCourses.id = 'main-courses';
    mainCourses.innerHTML = `
        <h2>Main Courses</h2>
        <div class="menu-grid">
            <div class="menu-item">
                <div class="item-header">
                    <h3>Truffle Wild Mushroom Risotto</h3>
                    <span class="price">$26</span>
                </div>
                <p>Arborio rice slow-cooked with porcini stock, finished with truffle oil, parmesan reggiano, and a medley of sautéed wild mushrooms. A rich, earthy delight.</p>
                <span class="tag veg">VEG</span> <span class="tag gf">GF</span>
            </div>
            <div class="menu-item">
                <div class="item-header">
                    <h3>Pan-Seared Salmon</h3>
                    <span class="price">$28</span>
                </div>
                <p>Atlantic salmon fillet with crispy skin, served on a bed of quinoa salad with asparagus and a lemon-dill cream sauce.</p>
                <span class="tag gf">GF</span>
            </div>
            <div class="menu-item">
                <div class="item-header">
                    <h3>Herb Crusted Lamb Rack</h3>
                    <span class="price">$34</span>
                </div>
                <p>Roasted rack of lamb with a rosemary and garlic crust, served with fondant potatoes, glazed carrots, and red wine jus.</p>
            </div>
            <div class="menu-item">
                <div class="item-header">
                    <h3>Spicy Arrabbiata Pasta</h3>
                    <span class="price">$22</span>
                </div>
                <p>Fresh tagliatelle tossed in a fiery tomato sauce with chili flakes, garlic, and fresh parsley.</p>
                <span class="tag spicy">SPICY</span> <span class="tag veg">VEG</span>
            </div>
        </div>
    `;

    // Refreshments Section
    const refreshments = document.createElement('section');
    refreshments.className = 'menu-section';
    refreshments.id = 'refreshments';
    refreshments.innerHTML = `
        <h2>Refreshments</h2>
        <div class="drinks-grid">
            <div class="drink-item">
                <img src="${lemonadeImg}" alt="Saffron Lemonade" class="drink-image">
                <div class="drink-info">
                    <h4>Saffron Lemonade</h4>
                    <span class="price">$6</span>
                </div>
                <p>House specialty with organic saffron strands.</p>
            </div>
            <div class="drink-item">
                <img src="${wineImg}" alt="House Pinot Noir" class="drink-image">
                <div class="drink-info">
                    <h4>House Pinot Noir</h4>
                    <span class="price">$12</span>
                </div>
                <p>A smooth red from Napa Valley, 2019.</p>
            </div>
            <div class="drink-item">
                <img src="${sodaImg}" alt="Italian Soda" class="drink-image">
                <div class="drink-info">
                    <h4>Italian Soda</h4>
                    <span class="price">$5</span>
                </div>
                <p>Choice of raspberry, peach, or vanilla.</p>
            </div>
        </div>
    `;

    // Menu Footer
    const footer = document.createElement('footer');
    footer.className = 'menu-footer';
    footer.innerHTML = `
        <div class="footer-grid">
            <div class="footer-brand">
                <div class="brand-title">
                    <span class="material-icons">restaurant</span>
                    <h3>The Saffron Bistro</h3>
                </div>
                <p>Bringing the finest culinary experiences to your table since 2015.</p>
            </div>
            <div class="footer-contact">
                <h4>CONTACT</h4>
                <p>123 Culinary Avenue, Food City</p>
                <p>(555) 123-4567</p>
                <p>hello@saffronbistro.com</p>
            </div>
            <div class="footer-hours">
                <h4>HOURS</h4>
                <p>Mon-Fri: 11am - 10pm</p>
                <p>Sat-Sun: 10am - 11pm</p>
            </div>
        </div>
        <div class="footer-copyright">
            <p>© 2026 The Saffron Bistro. All rights reserved.</p>
        </div>
    `;

    container.appendChild(banner);
    container.appendChild(categoriesNav);
    menuContent.appendChild(smallPlates);
    menuContent.appendChild(mainCourses);
    menuContent.appendChild(refreshments);
    container.appendChild(menuContent);
    container.appendChild(footer);
    container.appendChild(createAttributionFooter());
    content.appendChild(container);

    // Add category tab functionality
    const categoryTabs = container.querySelectorAll('.category-tab');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const category = tab.dataset.category;
            const section = document.getElementById(category);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}
