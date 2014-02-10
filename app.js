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
            ],
            type: 'spline'
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
            {start: -1, end: 6, class: 'Night'},
            {start: 22, end: 24, class: 'Night'}
        ],
        bindto: '#graph_timescale'
    });
            
    window.setTimeout(function(){
        //Get the timedata. This is mostly just occurance-based data, so we have to set it up a little differently.
        var timedata = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        d3.csv('data/all.csv', function(d){
            timedata[moment(d.datetime).hour()]++;
        }, function(err, rows){
            var td = _.map(timedata, function(d){
                return [d];
            });
            td.splice(0, 0, ['Number Of Messages']);
            timescale.load({rows: td});
        });
    }, 1000);
    
    ages = c3.generate({
        data: {
            columns: [
                ['Number Of Messages', 0, 0, 0, 0]
            ],
            type: 'bar'
        },
        axis: {
            x: {
                label: 'Age',
                type: 'categorized',
                categories: ['0-20', '21-30', '31-40', '40+']
            }
        },
        bindto: '#graph_ages'
    });
    window.setTimeout(function(){
        var agedata = ['Number Of Messages', 0, 0, 0, 0];
        d3.csv('data/all.csv', function(d){
            d.age = +d.age;
            if(d.age <= 20){
                agedata[1]++;
            }else if(d.age <= 30){
                agedata[2]++;
            }else if(d.age <= 40){
                agedata[3]++;
            }else{
                agedata[4]++;
            }
        }, function(err, rows){
            ages.load({columns: [agedata]});
        });
    }, 1000);

    var agelines = c3.generate({
        data: {
            columns: [
                ['Younger', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                ['Older', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ],
            type: 'spline'
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
            {start: -1, end: 6, class: 'Night'},
            {start: 22, end: 24, class: 'Night'}
        ],
        bindto: '#graph_age_lines'
    });
            
    window.setTimeout(function(){
        //Get the timedata. This is mostly just occurance-based data, so we have to set it up a little differently.
        var youngdata = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var olddata = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        d3.csv('data/all.csv', function(d){
            if(+d.age <= 20){
                youngdata[moment(d.datetime).hour()]++;
            }else{
                olddata[moment(d.datetime).hour()]++;
            }
        }, function(err, rows){
            youngdata.splice(0, 0, ['Younger']);
            olddata.splice(0, 0, ['Older']);
            agelines.load({columns: [youngdata, olddata]});
        });
    }, 1000);
    
    var genderdata = [
        //female
    	{
    		value: 0,
    		color:"#ff69b4"
    	},
        //male
    	{
    		value : 0,
    		color : "#0074D9"
    	}			
    ];
    d3.csv('data/all.csv', function(d){
        if(d.gender === 'female'){
            genderdata[0].value++;
        }else{
            genderdata[1].value++;
        }
    }, function(err, rows){
        var ctx = $("#graph_gender_pie").get(0).getContext("2d");
        var gender = new Chart(ctx).Pie(genderdata);
    });

    var genderlines = c3.generate({
        data: {
            columns: [
                ['Male', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                ['Female', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ],
            type: 'spline'
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
        bindto: '#graph_gender_lines'
    });
            
    window.setTimeout(function(){
        //Get the timedata. This is mostly just occurance-based data, so we have to set it up a little differently.
        var maledata = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var femaledata = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        d3.csv('data/all.csv', function(d){
            if(d.gender === 'male'){
                maledata[moment(d.datetime).hour()]++;
            }else{
                femaledata[moment(d.datetime).hour()]++;
            }
        }, function(err, rows){
            maledata.splice(0, 0, ['Male']);
            femaledata.splice(0, 0, ['Female']);
            genderlines.load({columns: [maledata, femaledata]});
        });
    }, 1000);


    var words = {};
    d3.csv('data/all.csv', function(d){
        var s = d.message;
        var punctuationless = s.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        s = punctuationless.replace(/\s{2,}/g," ");
        _.each(s.split(' '), function(word){
            if(word){
                word = word.toLowerCase();
                if(!words[word]){
                    words[word] = {
                        text: word,
                        size: 10
                    }
                }
                words[word].size++;
            }
        });
    }, function(err, rows){
        console.log(words);
        var fill = d3.scale.category20();
        d3.layout.cloud().size([700, 400])
          .words(_.values(words) )
          .padding(5)
          .rotate(function() { return 0; })
          .font('"Helvetica Neue", Helvetica, Arial sans-serif')
          .fontSize(function(d) { return d.size; })
          .on("end", draw)
          .start();
        
        function draw(words) {
            d3.select("#graph_words").append("svg")
                .attr("width", 700)
                .attr("height", 400)
              .append("g")
                .attr("transform", "translate(350,200)")
              .selectAll("text")
                .data(words)
              .enter().append("text")
                .style("font-size", function(d) { return d.size + "px"; })
                .style("font-family", '"Helvetica Neue", Helvetica, Arial sans-serif')
                .style("fill", function(d, i) { return fill(i); })
                .attr("text-anchor", "middle")
                .attr("transform", function(d) {
                  return "translate(" + [d.x, d.y] + ")";
                })
                .text(function(d) { return d.text; });
        }
    });


    var late = [
        //on-time
    	{
    		value: 0,
    		color:"#3c763d"
    	},
        //late
    	{
    		value : 0,
    		color : "#a94442"
    	}			
    ];
    d3.csv('data/all.csv', function(d){
        if(d.late === 'yes'){
            late[1].value++;
        }else{
            late[0].value++;
        }
    }, function(err, rows){
        var ctx = $("#graph_late").get(0).getContext("2d");
        var gender = new Chart(ctx).Doughnut(late);
    });

});