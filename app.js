$(function(){
    
    var sections = $('section');
    
    //scroll to next section:
    $('.next-section').on('click', function(){
        
        //Find next section:
        var section = +$(this).data('scrollto') || 0;
        var $section = $(sections[section]);
        
        $('html, body').animate({
            scrollTop: $section.offset().top
        }, 500, function(){
            window.location.hash = $section.attr('id');
        });
    });
    
    
    /*
     * CHARTS
     * ------
     */
    
    var timescale = c3.generate({
        data: {
            x: 'x',
            columns: [
                ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
                ['sample', 30, 200, 100, 400, 150, 250]
            ]
        },
        axis : {
            x : {
                type : 'timeseries'
            }
        },
        bindto: '#graph_timescale'
    });
    
    var ages = c3.generate({
        data: {
            columns: [
                ['Age', 30, 200, 100, 400, 150, 250]
            ],
            type: 'bar'
        },
        axis: {
            x: {
                type: 'categorized',
                categories: ['0-10', '11-20', '21-30', '31-40', '40+']
            }
        },
        bindto: '#graph_ages'
    });
    
    var fill = d3.scale.category20();
    d3.layout.cloud().size([300, 300])
      .words([
        "Hello", "world", "normally", "you", "want", "more", "words",
        "than", "this"].map(function(d) {
        return {text: d, size: 10 + Math.random() * 90};
      }))
      .padding(5)
      .rotate(function() { return 0; })
      .font('"Helvetica Neue", Helvetica, Arial sans-serif')
      .fontSize(function(d) { return d.size; })
      .on("end", draw)
      .start();
    
    function draw(words) {
    d3.select("#graph_words").append("svg")
        .attr("width", 300)
        .attr("height", 300)
      .append("g")
        .attr("transform", "translate(150,150)")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
    }
    
    var data = [
    	{
    		value: 48,
    		color:"#ff69b4"
    	},
    	{
    		value : 52,
    		color : "#0074D9"
    	}			
    ];
    var ctx = $("#graph_gender_pie").get(0).getContext("2d");
    var gender = new Chart(ctx).Pie(data);
});