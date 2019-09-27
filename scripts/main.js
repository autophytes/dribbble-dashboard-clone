function drawGraph() {

    // const svgExists = document.getElementById('svgWrapper');
    // if (svgExists) {
    //     svgExists.parentNode.removeChild(svgExists);
    // }

    const cleanData = [
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
        [5, 4],
        [6, 6],
        [7, 5],
        [8, 7],
        [9, 8],
        [10, 9],
        [11, 9],
        [12, 12],
        [13, 10],
        [14, 11],
        [15, 11],
        [16, 12],
        [17, 12],
        [18, 11],
        [19, 13],
        [20, 11],
        [21, 12],
        [22, 14],
        [23, 14],
        [24, 12],
        [25, 13],
        [26, 15],
        [27, 14],
        [28, 14],
        [29, 13],
        [30, 15]
    ]

    // const cleanData = savingsArray.map(function(d) {
    //     return [d.year, Math.max(d.savings / 1000, 0)]
    // });
    console.log(cleanData)
    
    const w = 1000;
    const h = 500;
    const axisPadding = 70;
    const rightPadding = 50;
    const numColumns = cleanData.length;
    
    const svg = d3.select('#svgWrapper')
        .append('svg')
        // .attr('width', "100%")
        // .attr('height', "100%")
        // .attr('width', w + "px")
        // .attr('height', h + "px")
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .attr('viewBox', "0 0 " + w + " " + h)
        .classed('svgContent', true)
        .attr('id', 'svgContent');
    
    const xScale = d3.scaleLinear() // Generate function to scale X values
        .domain([d3.min(cleanData, (d) => d[0]), d3.max(cleanData, (d) => d[0])])
        .range([axisPadding, w - rightPadding]);
    
    const yScale = d3.scaleLinear() // Generate function to scale Y values
        // .domain([d3.min(cleanData, (d) => d[1]), d3.max(cleanData, (d) => d[1])])
        .domain([0, d3.max(cleanData, (d) => d[1])])
        .range([h - axisPadding, 0]);
    
    const xAxis = d3.axisBottom() // Generate Bottom Axis
        .scale(xScale)
        .ticks(5);
    
    const yAxis = d3.axisLeft() // Generate Left Axis
        .scale(yScale)
        // .tickFormat(d3.format("$,.0f"))
        .ticks(5);
    
    // svg.append('text')  // Title
    //     .attr('x', w / 2)
    //     .attr('y', padding / 2)
    //     .attr('text-anchor', 'middle')
    //     .attr('class', 'chartTitle')
    //     .text(input.name + "'s Retirement Estimate");
    
    // svg.append('text') // Y Axis Label
    //   .attr('x', -padding)
    //   .attr('y', padding + 30)
    //   .attr('text-anchor', 'end')
    //   .attr('class', 'axisTitle')
    //   .text('Savings ($1,000\'s)')
    //   .attr('transform', 'rotate(-90)'); // Changes the way the x and y positioning work
    
    svg.append('g') // Bottom Axis
        .attr('transform', 'translate(0, ' + (h - axisPadding) + ')')  
        .attr('class', 'bottomAxis')
        .call(xAxis);
    
    svg.append('g') // Left Axys
        .attr('transform', 'translate(' + axisPadding + ', 0)')
        .attr('class', 'leftAxis')
        .call(yAxis);
    
    svg.selectAll('rect') // Draw the rectangles
        .data(cleanData)
        .enter()
        .append('rect')
        // .attr('class', 'graphBar')
        .attr("fill", function (d, i) { // Note: I could create scale functions for these
            return 'rgb(' + Math.round(212 - i * (212-108)/30) + ', ' + Math.round(89 + i * (188-89)/30) + ', ' + Math.round(80 + i * (165-80)/30) + ')'
        })
        .attr('x', (d, i) => xScale(d[0]))
        .attr('y', h - axisPadding)
        .attr('width', (w - axisPadding - rightPadding) / numColumns - 7)
        .attr('height', 0)
            .transition()
            .duration(850)  // Removing the delay makes them all just grow from the bottom
            .delay(function (d, i) {
            return i * 10;
            })
        .attr('y', (d) => yScale(d[1]))
        .attr('height', (d) => h - yScale(d[1]) - axisPadding);


}

drawGraph();
