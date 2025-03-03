document.addEventListener('DOMContentLoaded', function() {
    // Animate bars in the success section
    const bars = document.querySelectorAll('.bar-fill');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Function to animate bars when they come into view
    function animateBars() {
        bars.forEach(bar => {
            if (isInViewport(bar)) {
                const value = bar.parentElement.getAttribute('data-value');
                let width;
                
                // Scale the bar width accordingly
                if (value > 100) {
                    width = 100; // Cap at 100% width
                } else {
                    width = value;
                }
                
                bar.style.width = width + '%';
            }
        });
    }
    
    // Initial check on page load
    animateBars();
    
    // Check on scroll
    window.addEventListener('scroll', animateBars);
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        });
    });
    
    // Create market growth graph (simple representation)
    const graphContainer = document.querySelector('.graph');
    if (graphContainer) {
        // Create SVG element
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        
        // Sample data points (years 2020-2025, values in trillions)
        const data = [
            { year: 2020, value: 2.5 },
            { year: 2021, value: 3.0 },
            { year: 2022, value: 3.5 },
            { year: 2023, value: 4.0 },
            { year: 2024, value: 4.5 },
            { year: 2025, value: 5.0 }
        ];
        
        // Create graph elements
        const width = graphContainer.clientWidth;
        const height = graphContainer.clientHeight;
        const padding = 40;
        const graphWidth = width - (padding * 2);
        const graphHeight = height - (padding * 2);
        
        // Create path for line
        const pathData = [];
        
        data.forEach((point, index) => {
            const x = padding + (index * (graphWidth / (data.length - 1)));
            const y = height - (padding + (point.value / 5 * graphHeight));
            
            // Create a dot for the data point
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', x);
            circle.setAttribute('cy', y);
            circle.setAttribute('r', 5);
            circle.setAttribute('fill', '#F1C40F');
            
            // Create label for year
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', x);
            text.setAttribute('y', height - 10);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('fill', 'white');
            text.textContent = point.year;
            
            // Create label for value
            const valueText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            valueText.setAttribute('x', x);
            valueText.setAttribute('y', y - 15);
            valueText.setAttribute('text-anchor', 'middle');
            valueText.setAttribute('fill', 'white');
            valueText.textContent = '$' + point.value + 'T';
            
            svg.appendChild(circle);
            svg.appendChild(text);
            svg.appendChild(valueText);
            
            // Add to path data
            if (index === 0) {
                pathData.push(`M ${x} ${y}`);
            } else {
                pathData.push(`L ${x} ${y}`);
            }
        });
        
        // Create path element
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData.join(' '));
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', '#1ABC9C');
        path.setAttribute('stroke-width', 3);
        
        // Append path before circles so circles appear on top
        svg.insertBefore(path, svg.firstChild);
        
        // Add to container
        graphContainer.appendChild(svg);
        
        // Animate the path drawing
        const pathLength = path.getTotalLength();
        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength;
        
        function animatePath() {
            if (isInViewport(graphContainer)) {
                path.style.transition = 'stroke-dashoffset 2s ease-in-out';
                path.style.strokeDashoffset = '0';
            }
        }
        
        // Initial check
        animatePath();
        
        // Check on scroll
        window.addEventListener('scroll', animatePath);
    }
    
    // Create simple diagram for technology section
    const diagramContainer = document.querySelector('.diagram-container');
    if (diagramContainer) {
        // Create a simple diagram with SVG
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        
        // Create elements for the diagram
        const inputBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        inputBox.setAttribute('x', '50');
        inputBox.setAttribute('y', '100');
        inputBox.setAttribute('width', '150');
        inputBox.setAttribute('height', '100');
        inputBox.setAttribute('rx', '10');
        inputBox.setAttribute('fill', 'rgba(255, 255, 255, 0.1)');
        inputBox.setAttribute('stroke', '#A9DFBF');
        
        const inputText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        inputText.setAttribute('x', '125');
        inputText.setAttribute('y', '150');
        inputText.setAttribute('text-anchor', 'middle');
        inputText.setAttribute('fill', 'white');
        inputText.textContent = 'Inputs';
        
        const modelBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        modelBox.setAttribute('x', '325');
        modelBox.setAttribute('y', '80');
        modelBox.setAttribute('width', '200');
        modelBox.setAttribute('height', '140');
        modelBox.setAttribute('rx', '10');
        modelBox.setAttribute('fill', 'rgba(255, 255, 255, 0.1)');
        modelBox.setAttribute('stroke', '#F8C1CC');
        
        const modelText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        modelText.setAttribute('x', '425');
        modelText.setAttribute('y', '150');
        modelText.setAttribute('text-anchor', 'middle');
        modelText.setAttribute('fill', 'white');
        modelText.textContent = 'AI Model';
        
        const outputBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        outputBox.setAttribute('x', '650');
        outputBox.setAttribute('y', '100');
        outputBox.setAttribute('width', '150');
        outputBox.setAttribute('height', '100');
        outputBox.setAttribute('rx', '10');
        outputBox.setAttribute('fill', 'rgba(255, 255, 255, 0.1)');
        outputBox.setAttribute('stroke', '#A9DFBF');
        
        const outputText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        outputText.setAttribute('x', '725');
        outputText.setAttribute('y', '150');
        outputText.setAttribute('text-anchor', 'middle');
        outputText.setAttribute('fill', 'white');
        outputText.textContent = 'Optimized Routes';
        
        // Arrows
        const arrow1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        arrow1.setAttribute('d', 'M 200 150 L 325 150');
        arrow1.setAttribute('stroke', '#A9DFBF');
        arrow1.setAttribute('stroke-width', '3');
        arrow1.setAttribute('marker-end', 'url(#arrowhead)');
        
        const arrow2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        arrow2.setAttribute('d', 'M 525 150 L 650 150');
        arrow2.setAttribute('stroke', '#A9DFBF');
        arrow2.setAttribute('stroke-width', '3');
        arrow2.setAttribute('marker-end', 'url(#arrowhead)');
        
        // Create arrowhead marker
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        marker.setAttribute('id', 'arrowhead');
        marker.setAttribute('markerWidth', '10');
        marker.setAttribute('markerHeight', '7');
        marker.setAttribute('refX', '10');
        marker.setAttribute('refY', '3.5');
        marker.setAttribute('orient', 'auto');
        
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', '0 0, 10 3.5, 0 7');
        polygon.setAttribute('fill', '#A9DFBF');
        
        marker.appendChild(polygon);
        defs.appendChild(marker);
        svg.appendChild(defs);
        
        // Add input labels
        const inputLabels = [
            { text: 'Traffic Data', x: 80, y: 80 },
            { text: 'Order Volume', x: 80, y: 220 }
        ];
        
        inputLabels.forEach(label => {
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', label.x);
            text.setAttribute('y', label.y);
            text.setAttribute('fill', 'white');
            text.textContent = label.text;
            svg.appendChild(text);
        });
        
        // Add elements to SVG
        svg.appendChild(inputBox);
        svg.appendChild(inputText);
        svg.appendChild(modelBox);
        svg.appendChild(modelText);
        svg.appendChild(outputBox);
        svg.appendChild(outputText);
        svg.appendChild(arrow1);
        svg.appendChild(arrow2);
        
        // Add svg to container
        diagramContainer
