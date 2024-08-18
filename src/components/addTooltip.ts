function addTooltip(element: HTMLElement, tooltipText: string) {
    const tooltip = document.createElement('div');
    tooltip.textContent = tooltipText;
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    tooltip.style.color = '#fff';
    tooltip.style.padding = '5px';
    tooltip.style.borderRadius = '3px';
    tooltip.style.display = 'none';
    tooltip.style.zIndex = '1000';
    tooltip.style.whiteSpace = 'nowrap';
    tooltip.style.fontSize = '10px';
  
    // Create the triangle below the tooltip
    const triangle = document.createElement('div');
    triangle.style.position = 'absolute';
    triangle.style.width = '0';
    triangle.style.height = '0';
    triangle.style.borderLeft = '5px solid transparent';
    triangle.style.borderRight = '5px solid transparent';
    triangle.style.borderTop = '5px solid rgba(255, 255, 255, 0.1)';
    triangle.style.top = '100%';
    triangle.style.left = '50%';
    triangle.style.transform = 'translateX(-50%)';
    triangle.style.display = 'none';
  
    // Append the triangle to the tooltip
    tooltip.appendChild(triangle);
  
    // Append the tooltip to the body
    document.body.appendChild(tooltip);
  
    // Function to position the tooltip
    const positionTooltip = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight - 5}px`;
      tooltip.style.left = `${rect.left + window.scrollX + (rect.width - tooltip.offsetWidth) / 2}px`;
    };
  
    // Show the tooltip on mouse enter
    element.addEventListener('mouseenter', (event) => {
      positionTooltip(event);
      tooltip.style.display = 'block';
      triangle.style.display = 'block';
    });
  
    // Hide the tooltip on mouse leave
    element.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
      tooltip.style.display = 'none';
    });
  
    // Reposition the tooltip on mouse move
    element.addEventListener('mousemove', positionTooltip);
  }
  
  export default addTooltip;