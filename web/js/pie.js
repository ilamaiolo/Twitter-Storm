var colorsCategory = {
	"Arts & Entertainment": "#1560BD",
	"College & University":"#E30B5C",
	"Food":"#FFD700",
	"Professional & Other Places":"#00FF7F",
	"Nightlife Spot":"#FFC0CB",
	"Parks & Outdoors":"#C04000",
	"Shops & Services":"#0096F5",
	"Travel & Transport":"#8F00FF",
	"Residence":"#FF9C00"
}

function checkColor(value){
	console.log("Value:"+value);
	if(typeof(value)==="undefined") return -1;
	var sharp = value[0];
	console.log("Sharp:"+sharp);
	if(sharp === "#"){
		return value;
	} else return -1;

}


Raphael.fn.pieChart = function (cx, cy, r, values, labels, stroke) {
    var paper = this,
        rad = Math.PI / 180,
        chart = this.set();
    function sector(cx, cy, r, startAngle, endAngle, params) {
        var x1 = cx + r * Math.cos(-startAngle * rad),
            x2 = cx + r * Math.cos(-endAngle * rad),
            y1 = cy + r * Math.sin(-startAngle * rad),
            y2 = cy + r * Math.sin(-endAngle * rad);
        return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
    }
    var angle = 0,
        total = 0,
        start = 0,
        process = function (j) {
            var value = values[j],
                angleplus = 360 * value / total,
                popangle = angle + (angleplus / 2),
                color = Raphael.hsb(start, .75, 1),
                ms = 500,
                delta = 30;
                bcolor = checkColor(colorsCategory[labels[j]]);
				console.log("bcolor:"+bcolor)
				if(bcolor === -1){
				bcolor = Raphael.hsb(start, 1, 1)
				var p = sector(cx, cy, r, angle, angle + angleplus, {fill: "90-" + bcolor + "-" + color, stroke: stroke, "stroke-width": 1});
				var txt = paper.text(cx + (r + delta + 55) * Math.cos(-popangle * rad), cy + (r + delta + 25) * Math.sin(-popangle * rad), labels[j]).attr({fill: bcolor, stroke: "none", opacity: 0, "font-size": 20});

				
				}else{
				
				var p = sector(cx, cy, r, angle, angle + angleplus, {fill:  bcolor , stroke: stroke, "stroke-width": 1});
				var txt = paper.text(cx + (r + delta + 55) * Math.cos(-popangle * rad), cy + (r + delta + 25) * Math.sin(-popangle * rad), labels[j]).attr({fill: bcolor, stroke: "none", opacity: 0, "font-size": 20});

				}
				
			
				
            p.mouseover(function () {
                p.stop().animate({transform: "s1.1 1.1 " + cx + " " + cy}, ms, "elastic");
                txt.stop().animate({opacity: 1}, ms, "elastic");
            }).mouseout(function () {
                p.stop().animate({transform: ""}, ms, "elastic");
                txt.stop().animate({opacity: 0}, ms);
            });
            angle += angleplus;
            chart.push(p);
            chart.push(txt);
            start += .1;
        };
    for (var i = 0, ii = values.length; i < ii; i++) {
        total += values[i];
    }
    for (i = 0; i < ii; i++) {
        process(i);
    }
    return chart;
};



// Raphael.fn.pieChart = function (cx, cy, r, values, labels, stroke) {
    // var paper = this,
        // rad = Math.PI / 180,
        // chart = this.set();
    // function sector(cx, cy, r, startAngle, endAngle, params) {
        // var x1 = cx + r * Math.cos(-startAngle * rad),
            // x2 = cx + r * Math.cos(-endAngle * rad),
            // y1 = cy + r * Math.sin(-startAngle * rad),
            // y2 = cy + r * Math.sin(-endAngle * rad);
        // return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
    // }
    // var angle = 0,
        // total = 0,
        // start = 0,
        // process = function (j) {
            // var value = values[j],
                // angleplus = 360 * value / total,
                // popangle = angle + (angleplus / 2),
                // color = Raphael.hsb(start, .75, 1),
                // ms = 500,
                // delta = 30,
                // bcolor = Raphael.hsb(start, 1, 1),
                // p = sector(cx, cy, r, angle, angle + angleplus, {fill: "90-" + bcolor + "-" + color, stroke: stroke, "stroke-width": 1}),
				// txt = paper.text(cx + (r + delta + 35) * Math.cos(-popangle * rad), cy + (r + delta + 25) * Math.sin(-popangle * rad), labels[j]).attr({fill: bcolor, stroke: "none", opacity: 0, "font-size": 20});
            // p.mouseover(function () {
                // p.stop().animate({transform: "s1.1 1.1 " + cx + " " + cy}, ms, "elastic");
                // txt.stop().animate({opacity: 1}, ms, "elastic");
            // }).mouseout(function () {
                // p.stop().animate({transform: ""}, ms, "elastic");
                // txt.stop().animate({opacity: 0}, ms);
            // });
            // angle += angleplus;
            // chart.push(p);
            // chart.push(txt);
            // start += .1;
        // };
    // for (var i = 0, ii = values.length; i < ii; i++) {
        // total += values[i];
    // }
    // for (i = 0; i < ii; i++) {
        // process(i);
    // }
    // return chart;
// };
