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
            rows: [
                ['Number Of Messages'],
                [0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]
            ]
        },
        axis: {
            x: {
                type: 'categorized',
                categories: [
                    '12am',
                    '1am',
                    '2am',
                    '3am',
                    '4am',
                    '5am',
                    '6am',
                    '7am',
                    '8am',
                    '9am',
                    '10am',
                    '11am',
                    '12pm',
                    '1pm',
                    '2pm',
                    '3pm',
                    '4pm',
                    '5pm',
                    '6pm',
                    '7pm',
                    '8pm',
                    '9pm',
                    '10pm',
                    '11pm',
                    '',
                ]
            }
        },
        //Highlight what we call "night"
        regions: [
            {start: 0, end: 6, class: 'Night'},
            {start: 22, end: 24, class: 'Night'}
        ],
        bindto: '#graph_timescale'
    });
    
    //Get the timedata. This is mostly just occurance-based data, so we have to set it up a little differently.
    var timedata = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    d3.csv('data/all.csv', function(d){
        timedata[moment(d.datetime).hour()]++;
    }, function(err, rows){
        var td = _.map(timedata, function(d){
            return [d];
        });
        td.splice(0, 0, ['Number Of Messages']);
        console.log(td);
        timescale.load({rows: td});
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