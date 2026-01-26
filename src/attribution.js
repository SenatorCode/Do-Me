// Shared attribution footer component
export function createAttributionFooter() {
    const footer = document.createElement('footer');
    footer.className = 'attribution-footer';
    footer.innerHTML = `
        <div class="attribution-content">
            <div class="attribution-section">
                <h5>Credits</h5>
                <p>Icons by <a href="https://fonts.google.com/icons" target="_blank" rel="noopener">Google Material Icons</a></p>
                <p>Images generated with AI assistance</p>
            </div>
            <div class="attribution-section">
                <h5>Developer</h5>
                <p>Built by <a href="https://github.com/SenatorCode" target="_blank" rel="noopener">SenatorCode</a></p>
                <p>View on <a href="https://github.com/SenatorCode/The-Saffron-Bistro" target="_blank" rel="noopener">GitHub</a></p>
            </div>
            <div class="attribution-section">
                <h5>Project</h5>
                <p>Part of <a href="https://www.theodinproject.com" target="_blank" rel="noopener">The Odin Project</a> curriculum</p>
            </div>
        </div>
    `;
    return footer;
}
