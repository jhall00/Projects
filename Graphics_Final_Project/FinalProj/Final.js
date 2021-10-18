/*Jessica Hall 
University of Massachuetts Lowell
Computer Graphics I Final Project 2021
*/
"use strict";
var start_x, start_y;
var drag = false;
var imageData;

var poly_pts = [];
var curve_pts = [];
// I use temp_pts variable to copy the shape variables into it so that I can have a universal shape container in each function
var temp_pts = []; 

var cx, cy; //used when calculating center of shape

var og_startx, og_starty; // holds the original start coordinates for shape currently working with
var pent_ogx, pent_ogy;
var countPolyPts;
var countCurvePts;

//JSON object containers
var rect_j;
var line_j;
var circle_j;
var triangle_j;
var polygon_j;
var curve_j;
var ellipse_j;
var square_j;
var pentagon_j;

// Point containers
var rect = [];
var line = [];
var circle = [];
var triangle = [];
var polygon = [];
var curve = [];
var ellipse = [];
var square = [];
var pentagon = [];

var shapes = [];
var undoArr = [];
var copy_j;
var paste_offset = 10;

var loadedJson;
var selectedType;
var selectedId ;
var pentagon_selected = false, square_selected = false, ellipse_selected = false, line_selected = false, circle_selected = false, rectangle_selected = false, poly_selected = false, triangle_selected = false, curve_selected = false;
var selectMode = false;

var lineCnt = 0, rectCnt = 0, circleCnt = 0, triangleCnt = 0, polygonCnt = 0, curveCnt = 0, ellipseCnt = 0, squareCnt = 0, pentagonCnt = 0;

var color;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
    }
    

    // each shape has a corresponding ID
    // circle = 1
    // line = 2
    // triangle = 3
    // rectangle = 4
    // polyline = 5
    // curve = 6
    // ellipse = 7
    // sqaure = 8
    // pentagon = 9
    // each transformation call uses it as parameter, so we know what shape we are changing

    document.getElementById("translate").onclick = function(event){
        //if(rectangle_selected == true){
            selectMode = false;
            //translate = true;
            myTranslate(selectedType);
        //}
    }
    document.getElementById("scale").onclick = function(event){
        //if(rectangle_selected == true){
            //translate = true;
            selectMode = false;
            myScale(selectedType);
        //}
    }
    document.getElementById("rotate").onclick = function(event){
       // if(rectangle_selected == true){
            //translate = true;
            selectMode = false;
            myRotate(selectedType);
        //}
    }

    document.getElementById("circle").onclick = function(event){
        
        circle_selected = true;
        document.getElementById("define").onclick = function(event){
            if(circle_selected == true){
                drawCircle();
            }
        }

    }

    document.getElementById("line").onclick = function(event){
        line_selected = true;
       
        document.getElementById("define").onclick = function(event){
            if(line_selected == true){
                drawLine();
            }
        }

    }
        
    document.getElementById("rectangle").onclick = function(event){
        rectangle_selected = true;
       
        document.getElementById("define").onclick = function(event){
            if(rectangle_selected == true){
                //translate = false;
                selectMode = false;
                drawRectangle();
  
            }
        }

    }

    document.getElementById("triangle").onclick = function(event){
        
        triangle_selected = true;
        
        document.getElementById("define").onclick = function(event){
            if(triangle_selected == true){
                //translate = false;
                drawTriangle();
            }
        }

    }

    document.getElementById("square").onclick = function(event){
        
        square_selected = true;
        
        document.getElementById("define").onclick = function(event){
            if(square_selected == true){
                //translate = false;
                drawSquare();
            }
        }

    }

    document.getElementById("polygon").onclick = function(event){
        
        poly_selected = true;
        
        document.getElementById("define").onclick = function(event){
            if(poly_selected == true){
                //translate = false;
                drawPolygon(); //return numpoints for next line
                
            }
        }
    }


    document.getElementById("curve").onclick = function(event){
        
        curve_selected = true;
        
        document.getElementById("define").onclick = function(event){
            if(curve_selected == true){
                //translate = false;
                drawCurve(); //return numpoints for next line
                
            }
        }

    }

    document.getElementById("ellipse").onclick = function(event){
        
        ellipse_selected = true;
        
        document.getElementById("define").onclick = function(event){
            if(ellipse_selected == true){
                //translate = false;
                drawEllipse();
                
            }
        }
    }

    document.getElementById("pentagon").onclick = function(event){
        
        pentagon_selected = true;
        
        document.getElementById("define").onclick = function(event){
            if(pentagon_selected == true){
                //translate = false;
                drawPentagon();
                
            }
        }
    }

    document.getElementById("save").onclick = function(event){
        shapes.push(circle);
        shapes.push(line);
        shapes.push(triangle);
        shapes.push(rect);
        shapes.push(polygon);
        shapes.push(curve);
        shapes.push(ellipse);
        shapes.push(square);
        shapes.push(pentagon);


        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([JSON.stringify(shapes, null, 2)], {
          type: "text/plain"
        }));
        a.setAttribute("download", "myDrawing.json");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    document.getElementById("file2").onclick = function(event){ // hidden button for choose file
        document.getElementById("fileToLoad").click();
    }


    document.getElementById("load").onclick = function(event){

        var textFromFileLoaded;
        var fileToLoad = document.getElementById("fileToLoad").files[0];
 
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) 
        {
            textFromFileLoaded = fileLoadedEvent.target.result;
            loadedJson = JSON.parse(textFromFileLoaded);
            circle = loadedJson[0];
            line = loadedJson[1];
            triangle = loadedJson[2];
            rect = loadedJson[3];
            polygon = loadedJson[4];
            curve = loadedJson[5];
            ellipse = loadedJson[6];
            square = loadedJson[7];
            pentagon = loadedJson[8];

            var canvas = document.getElementById( "gl-canvas" );
    
            if (canvas.getContext) {
                var ctx2 = canvas.getContext('2d');
            }
            ctx2.clearRect(0, 0, canvas.width, canvas.height);


            for (var i = 0; i < circle.length; i++){
                reDrawShapes(1,i);
            }
            for (var i = 0; i < line.length; i++){
                reDrawShapes(2,i);
            }
            for (var i = 0; i < triangle.length; i++){
                reDrawShapes(3,i);
            }
            for (var i = 0; i < rect.length; i++){
                reDrawShapes(4,i);
            }
            for (var i = 0; i < polygon.length; i++){
                reDrawShapes(5,i);
            }
            for (var i = 0; i < curve.length; i++){
                reDrawShapes(6,i);
            }
            for (var i = 0; i < ellipse.length; i++){
                reDrawShapes(7,i);
            }
            for (var i = 0; i < square.length; i++){
                reDrawShapes(8,i);
            }
            for (var i = 0; i < pentagon.length; i++){
                reDrawShapes(9,i);
            }

        };
        fileReader.readAsText(fileToLoad, "UTF-8");


    }

    document.getElementById("select").onclick = function(event){
        selectMode = true;
        selector();
    }
    document.getElementById("undo").onclick = function(event){
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var current  = undoArr.pop();

        if(current.type == "circle"){
            circle[current.ID] = current;
        }
        for (var i = 0; i < circle.length; i++){
            reDrawShapes(1,i);
        }
        if(current.type == "line"){
            line[current.ID] = current;
        }
        for (var i = 0; i < line.length; i++){
            reDrawShapes(2,i);
        }
        if(current.type == "triangle"){
            triangle[current.ID] = current;
        }
        for (var i = 0; i < triangle.length; i++){
            reDrawShapes(3,i);
        }
        if(current.type == "rectangle"){
            rect[current.ID] = current;
        }
        for (var i = 0; i < rect.length; i++){
            reDrawShapes(4,i);
        }
        if(current.type == "polygon"){
            polygon[current.ID] = current;
        }
        for (var i = 0; i < polygon.length; i++){
            reDrawShapes(5,i);
        }
        if(current.type == "curve"){
            curve[current.ID] = current;
        }
        for (var i = 0; i < curve.length; i++){
                reDrawShapes(6,i);
        }
        if(current.type == "ellipse"){
            ellipse[current.ID] = current;
        }
        for (var i = 0; i < ellipse.length; i++){
            reDrawShapes(7,i);
        }
        if(current.type == "square"){
            square[current.ID] = current;
        }
        for (var i = 0; i < square.length; i++){
            reDrawShapes(8,i);
        }
        if(current.type == "pentagon"){
            pentagon[current.ID] = current;
        }
        for (var i = 0; i < pentagon.length; i++){
            reDrawShapes(9,i);
        }
    }
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'z') {
            document.getElementById("undo").click();
        }
    });

    document.getElementById("image").onclick = function(event){
        canvas.toBlob(function(blob) {
            let link = document.createElement('a');
            link.download = 'canvasPic.png';
          
            link.href = URL.createObjectURL(blob);
            link.click();
          
            URL.revokeObjectURL(link.href);
          }, 'image/png');
    }

    document.getElementById("copy").onclick = function(event){
        switch(selectedType){
            case 1:
                copy_j = JSON.parse(JSON.stringify(circle[selectedId]));
                break;
            case 2:
                copy_j = JSON.parse(JSON.stringify(line[selectedId]));
                break;
            case 3:
                copy_j = JSON.parse(JSON.stringify(triangle[selectedId]));
                break;
            case 4:
                copy_j = JSON.parse(JSON.stringify(rect[selectedId]));
                break;
            case 5:
                copy_j = JSON.parse(JSON.stringify(polygon[selectedId]));
                break;
            case 6:
                copy_j = JSON.parse(JSON.stringify(curve[selectedId]));
                break;
            case 7:
                copy_j = JSON.parse(JSON.stringify(ellipse[selectedId]));
                break;
            case 8:
                copy_j = JSON.parse(JSON.stringify(square[selectedId]));
                break;
            case 9:
                copy_j = JSON.parse(JSON.stringify(pentagon[selectedId]));
                break;
        }
        paste_offset = 10;
        
    }
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'c') {
            document.getElementById("copy").click();
        }
    });
    document.getElementById("paste").onclick = function(event){
        switch(copy_j.typeNum){
            case 1:
                drawCircle(copy_j);
                break;
            case 2:
                drawLine(copy_j);
                break;
            case 3:
                drawTriangle(copy_j);
                break;
            case 4:
                drawRectangle(copy_j);
                break;
            case 5:
                drawPolygon(copy_j);
                break;
            case 6:
                drawCurve(copy_j);
                break;
            case 7:
                drawEllipse(copy_j);
                break;
            case 8:
                drawSquare(copy_j);
                break;
            case 9:
                drawPentagon(copy_j);
                break;
        }
        
    }
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'v') {
            document.getElementById("paste").click();
        }
    });

    document.getElementById("new").onclick = function(event){

        if(rect.length != 0 || line.length != 0 || circle.length != 0 || triangle.length != 0 || polygon.length != 0 || curve.length !=0
                 || ellipse.length != 0 || square.length != 0 || pentagon.length != 0){
             
            if (confirm("Do you want to save to JSON?")) {
                document.getElementById("save").click();
            } 
            else {
                
            }
        }
        // clear everything (canvas and variables)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        lineCnt = 0, rectCnt = 0, circleCnt = 0, triangleCnt = 0, polygonCnt = 0, curveCnt = 0, ellipseCnt = 0, squareCnt = 0, pentagonCnt = 0;

        copy_j = {};
        poly_pts = [];
        curve_pts = [];
        temp_pts = []; 

        rect = [];
        line = [];
        circle = [];
        triangle = [];
        polygon = [];
        curve = [];
        ellipse = [];
        square = [];
        pentagon = [];
        
        shapes = [];
        undoArr = [];

    }
}


// only takes rot_angle if myRotate is being manually called from another function i.e. in scale we have to un-rotate, scale, re-rotate
function myRotate(numPoints, rot_angle){
    var manual = true;
    if((typeof rot_angle) == 'undefined'){ // when we don't have rot_angle defined we know we are using function with user mouse movements
        manual = false;
    }
    var canvas = document.getElementById( "gl-canvas" );
    
    if (canvas.getContext) {
        var ctx2 = canvas.getContext('2d');
    }
    canvas.onmousedown = function(event){
        drag =true;
        var pos = getMousePos(canvas, event);
        
        ctx2.clearRect(0, 0, canvas.width, canvas.height);
        if(manual == false){
            switch(numPoints){
                case 1:
                    //temp_pts.length = 0;
                    undoArr.push(JSON.parse(JSON.stringify(circle[selectedId])));
                    break;
                case 2:
                    //temp_pts.length = 0;
                    //undoTemp = line[selectedId];
                    undoArr.push(JSON.parse(JSON.stringify(line[selectedId])));
                    break;
                case 3:
                    //temp_pts.length = 0;
                    undoArr.push(JSON.parse(JSON.stringify(triangle[selectedId])));
                    break;
                case 4:
                    undoArr.push(JSON.parse(JSON.stringify(rect[selectedId])));
                    break;
                case 5:
                    undoArr.push(JSON.parse(JSON.stringify(polygon[selectedId])));
                    break;
                case 6:
                    undoArr.push(JSON.parse(JSON.stringify(curve[selectedId])));
                    break;
                case 7:
                    undoArr.push(JSON.parse(JSON.stringify(ellipse[selectedId])));
                    break;
                case 8:
                    undoArr.push(JSON.parse(JSON.stringify(square[selectedId])));
                    break;
                case 9:
                    undoArr.push(JSON.parse(JSON.stringify(pentagon[selectedId])));
                    break;

            }
        }

       
        reDrawHelper();
        imageData = ctx2.getImageData(0,0,canvas.width,canvas.height);


        //calculate center for all objects using switch case and store points in universal temp container
        switch(numPoints){
            case 1:
                cx = (circle[selectedId].points[0].x +circle[selectedId].points[1].x)/2; 
                cy =(circle[selectedId].points[0].y + circle[selectedId].points[1].y)/2;
                temp_pts = circle[selectedId];
                color = "orange";
                break;
            case 2:
                cx = (line[selectedId].points[0].x +line[selectedId].points[1].x)/2;
                cy =(line[selectedId].points[0].y + line[selectedId].points[1].y)/2;
                temp_pts = line[selectedId];
                color = "red";
                break;
            case 3:

                cx = (triangle[selectedId].points[0].x +triangle[selectedId].points[1].x + triangle[selectedId].points[2].x)/3;
                cy = (triangle[selectedId].points[0].y + triangle[selectedId].points[1].y + triangle[selectedId].points[2].y)/3;
                temp_pts = triangle[selectedId];
                color = "SeaGreen";
                break;
            case 4:
                cx = (rect[selectedId].points[0].x + rect[selectedId].points[2].x)/2;
                cy =(rect[selectedId].points[0].y + rect[selectedId].points[2].y)/2;
                temp_pts = rect[selectedId];
                color = "YellowGreen";
                break;
            case 5:
                var sumX = 0;
                var sumY =0;
                for(var i =0; i< polygon[selectedId].numberPts; i++){
                  
                    sumX = polygon[selectedId].points[i].x + sumX;
                    sumY = polygon[selectedId].points[i].y + sumY;
                }
                cx = sumX/polygon[selectedId].numberPts;
                cy = sumY/polygon[selectedId].numberPts;
                temp_pts = polygon[selectedId];
                color = "teal";
                break;
            case 6:
                cx = (curve[selectedId].points[0].x +curve[selectedId].points[1].x + curve[selectedId].points[2].x)/3;
                cy =  (curve[selectedId].points[0].y + curve[selectedId].points[1].y + curve[selectedId].points[2].y)/3;
                temp_pts = curve[selectedId];
                color = "SteelBlue"
                break;
            case 7:
                cx = (ellipse[selectedId].points[0].x +ellipse[selectedId].points[1].x)/2;
                cy =  (ellipse[selectedId].points[0].y + ellipse[selectedId].points[1].y)/2;
                temp_pts = ellipse[selectedId];
                color = "RebeccaPurple";
                break;
            case 8:
                cx = (square[selectedId].points[0].x + square[selectedId].points[2].x)/2;
                cy =(square[selectedId].points[0].y + square[selectedId].points[2].y)/2;
                temp_pts = square[selectedId];
                color = "SkyBlue";
                break;
            case 9:
                var sumX = 0;
                var sumY = 0;
                for(var i = 0 ;i < pentagon[selectedId].numberPts; i++){
                    sumX = pentagon[selectedId].points[i].x + sumX;
                    sumY = pentagon[selectedId].points[i].y +sumY;
                }
                cx = sumX/5;
                cy =sumY/5;
                temp_pts = pentagon[selectedId];
                color = "lightCoral"
                break;
        }
    }

    if (manual == false){
        canvas.onmousemove = function (event){
            if (drag == true){
            var pos = getMousePos(canvas, event);
        
            var current_x = pos.x;
            var current_y = pos.y;
            ctx2.putImageData(imageData, 0, 0);

            drawRotation(numPoints, manual, canvas, current_x, current_y);
            }
        }
    }
    else{
        ctx2.putImageData(imageData, 0, 0);
        var current_x = 0;
        var current_y = 0;
        drawRotation(numPoints, manual, canvas, current_x, current_y, rot_angle); // same as above, but explicitly sets rot_angle
    }
    canvas.onmouseup = function (event){
        drag = false;
    }
}

function drawRotation(numPoints, manual, canvas, current_x, current_y, rot_angle){
    if (canvas.getContext) {
        var ctx2 = canvas.getContext('2d');
    }
    ctx2.beginPath();
    ctx2.lineWidth = "3";
    ctx2.strokeStyle = color;
    
   
    if(manual == true){
        rot_angle = rot_angle * (180/Math.PI);
        var matrix1 = rotateZ(rot_angle);
    }
    else{
        var angle =  Math.atan2(current_y-cy,current_x-cx); //use atan2 to get the angle from x axis to mouse point
        var temp = angle;
        //get the angle difference from the big angle calculated minus what we have already rotated by
        // basically if we didn't find the difference we would be adding that whole angle each time mouse moved instead of only 
        // rotating by how much we have moved since the last stroke()
        angle = angle -  temp_pts.rotation; // latter part stores total rotation that has happened on object
        temp_pts.rotation =temp; // update total angle rotated
        angle = angle * (180/Math.PI); // convert to degrees
        var matrix1 = rotateZ(angle);
    }
    var pt = []; //will hold the results of what gets multiplied by rotation matrix (new coordinates)

    //circle
    if(numPoints == 1){
        // pt has same structure as shape arrays
        pt.push(mult(matrix1, (pointMat(temp_pts.points[0].x, temp_pts.points[0].y, 0))));
        pt.push(mult(matrix1, (pointMat(temp_pts.points[1].x, temp_pts.points[1].y, 0))));

        start_x = pt[0][0][0];
        start_y = pt[0][1][0];

        current_x = pt[1][0][0];
        current_y = pt[1][1][0];

        // pointMat takes the x,y coord and puts them in a 4x4 matrix, like this
        // 0: (4) [x, 0, 0, 0]
        // 1: (4) [y, 0, 0, 0]
        // 2: (4) [0, 0, 0, 0]
        // 3: (4) [1, 0, 0, 0]

        circle[selectedId].points[0].x = start_x;
        circle[selectedId].points[0].y = start_y;

        circle[selectedId].points[1].x = current_x;
        circle[selectedId].points[1].y = current_y;

        // move shape's first point back to center after rotation
        myTranslate(1, cx, cy);
        // move shape so that now the CENTER of the object lines up with the center
        // move shape by the distance from its center after it's translated and the starting point 
        // basically move the shape up by half its size in order for rotation around the center
        var newMidx = (circle[selectedId].points[0].x + circle[selectedId].points[1].x)/2;
        var newMidy = (circle[selectedId].points[0].y + circle[selectedId].points[1].y)/2;
        var disX = newMidx - circle[selectedId].points[0].x;
        var disY = newMidy - circle[selectedId].points[0].y;
        myTranslate(1, (circle[selectedId].points[0].x - disX), (circle[selectedId].points[0].y - disY)); // circle_pts - dis gives us new coords to translate to
        temp_pts = circle[selectedId];

        var centerx = (circle[selectedId].points[0].x + circle[selectedId].points[1].x)/2;
        var centery = (circle[selectedId].points[0].y + circle[selectedId].points[1].y)/2;
        var radius = Math.sqrt(Math.pow((centerx - circle[selectedId].points[0].x),2) + Math.pow((centery - circle[selectedId].points[0].y), 2));
        if(manual != true){
            ctx2.arc(centerx, centery, radius, 0, 2*Math.PI);
            ctx2.stroke(); // Draw it
        }
    }

    else if(numPoints ==7){
        for(var i = 0; i < 2; i++){
            pt.push(mult(matrix1, (pointMat(temp_pts.points[i].x, temp_pts.points[i].y, 0))));
        }

        start_x = pt[0][0][0];
        start_y = pt[0][1][0];

        current_x = pt[1][0][0];
        current_y = pt[1][1][0];

        ellipse[selectedId].points[0].x = start_x;
        ellipse[selectedId].points[0].y = start_y;

        ellipse[selectedId].points[1].x = current_x;
        ellipse[selectedId].points[1].y = current_y;
        ellipse[selectedId].rotation = temp_pts.rotation;


        // move shape's first point back to center after rotation
        myTranslate(7, cx, cy);
        // move shape so that now the CENTER of the object lines up with the center
        // move shape by the distance from its center after it's translated and the starting point 
        // basically move the shape up by half its size in order for rotation around the center
        var newMidx = (ellipse[selectedId].points[0].x + ellipse[selectedId].points[1].x)/2;
        var newMidy = (ellipse[selectedId].points[0].y + ellipse[selectedId].points[1].y)/2;
        var disX = newMidx - ellipse[selectedId].points[0].x;
        var disY = newMidy - ellipse[selectedId].points[0].y;
        myTranslate(7, (ellipse[selectedId].points[0].x - disX), (ellipse[selectedId].points[0].y - disY)); // circle_pts - dis gives us new coords to translate to
        temp_pts = ellipse[selectedId];

        var centerx = (ellipse[selectedId].points[0].x + ellipse[selectedId].points[1].x)/2;
        var centery = (ellipse[selectedId].points[0].y + ellipse[selectedId].points[1].y)/2;
        var radiusx = Math.abs(temp_pts.points[1].x - centerx);
        var radiusy = Math.abs(temp_pts.points[1].y - centery);
        if(manual != true){
            ctx2.ellipse(centerx, centery, ellipse[selectedId].radiusX, ellipse[selectedId].radiusY, ellipse[selectedId].rotation, 0, 2*Math.PI);
            ctx2.stroke(); // Draw it
        }
    }
    else{

        for(var i= 0; i< temp_pts.numberPts; i++){
            pt.push(mult(matrix1, (pointMat(temp_pts.points[i].x, temp_pts.points[i].y, 0))));
        }
        start_x = pt[0][0][0];
        start_y = pt[0][1][0];

        current_x = pt[1][0][0];
        current_y = pt[1][1][0];
    }
        
        //ctx2.stroke(); // Draw it
        switch(numPoints){
            case 2:
                line[selectedId].points[0].x = start_x;
                line[selectedId].points[0].y = start_y;

                line[selectedId].points[1].x = current_x;
                line[selectedId].points[1].y = current_y;

               // sets total rotation in individual shape's array (last spot in each array)
                line[selectedId].rotation = temp_pts.rotation;
                
                // same logic as explained with circle above
                myTranslate(2, cx, cy);
                var newMidx = (line[selectedId].points[0].x +line[selectedId].points[1].x)/2;
                var newMidy = (line[selectedId].points[0].y + line[selectedId].points[1].y)/2;
                var disX = newMidx - line[selectedId].points[0].x;
                var disY = newMidy - line[selectedId].points[0].y;
                myTranslate(2, (line[selectedId].points[0].x - disX), (line[selectedId].points[0].y - disY));
                temp_pts = line[selectedId];
                break;

            case 3:
                triangle[selectedId].points[0].x = start_x;
                triangle[selectedId].points[0].y = start_y;

                triangle[selectedId].points[1].x = current_x;
                triangle[selectedId].points[1].y = current_y;

                triangle[selectedId].points[2].x = pt[2][0][0];
                triangle[selectedId].points[2].y = pt[2][1][0];

                triangle[selectedId].rotation = temp_pts.rotation;

                myTranslate(3, cx, cy);
                var newMidx = (triangle[selectedId].points[0].x +triangle[selectedId].points[1].x  + triangle[selectedId].points[2].x )/3;
                var newMidy = (triangle[selectedId].points[0].y + triangle[selectedId].points[1].y + triangle[selectedId].points[2].y)/3;
                
                var disX = newMidx - triangle[selectedId].points[0].x;
                var disY = newMidy - triangle[selectedId].points[0].y;
                myTranslate(3, (triangle[selectedId].points[0].x - disX), (triangle[selectedId].points[0].y - disY));
                temp_pts = triangle[selectedId];
                break;
            case 4:
      

                rect[selectedId].points[0].x = start_x;
                rect[selectedId].points[0].y = start_y;

                rect[selectedId].points[1].x = current_x;
                rect[selectedId].points[1].y = current_y;

                rect[selectedId].points[2].x = pt[2][0][0];
                rect[selectedId].points[2].y = pt[2][1][0];

                rect[selectedId].points[3].x = pt[3][0][0];
                rect[selectedId].points[3].y = pt[3][1][0];

                rect[selectedId].rotation = temp_pts.rotation


                myTranslate(4, cx, cy);
                var newMidx = ( rect[selectedId].points[0].x + rect[selectedId].points[2].x)/2;
                var newMidy = (rect[selectedId].points[0].y + rect[selectedId].points[2].y)/2;
                var disX = newMidx - rect[selectedId].points[0].x;
                var disY = newMidy - rect[selectedId].points[0].y;
                myTranslate(4, (rect[selectedId].points[0].x - disX), (rect[selectedId].points[0].y - disY));
                temp_pts = rect[selectedId];
                break;
            case 5:
                for(var b=0; b< temp_pts.numberPts; b++){
                    polygon[selectedId].points[b].x = pt[b][0][0];
                    polygon[selectedId].points[b].y = pt[b][1][0];
                }
                polygon[selectedId].rotation = temp_pts.rotation;
                myTranslate(5, cx, cy);
                var sumX = 0;
                var sumY =0;

                for(var i =0; i< temp_pts.numberPts; i++){

                    sumX = polygon[selectedId].points[i].x + sumX;
                    sumY = polygon[selectedId].points[i].y + sumY;
                }
                var newMidx = sumX/temp_pts.numberPts;
                var newMidy = sumY/temp_pts.numberPts;

                var disX = newMidx - polygon[selectedId].points[0].x;
                var disY = newMidy - polygon[selectedId].points[0].y;
                myTranslate(5, (polygon[selectedId].points[0].x - disX), (polygon[selectedId].points[0].y - disY));
                temp_pts = polygon[selectedId];
                break;
            case 6:
                var b;
                for(b=0; b< 3; b++){
                    curve[selectedId].points[b].x = pt[b][0][0];
                    curve[selectedId].points[b].y = pt[b][1][0];
                }
                curve[selectedId].rotation = temp_pts.rotation;
                myTranslate(6, cx, cy);
                var newMidx = (curve[selectedId].points[0].x +curve[selectedId].points[1].x + curve[selectedId].points[2].x)/3;
                var newMidy = (curve[selectedId].points[0].y + curve[selectedId].points[1].y +curve[selectedId].points[1].y)/3;
                
                var disX = newMidx - curve[selectedId].points[0].x;
                var disY = newMidy - curve[selectedId].points[0].y;
                myTranslate(6, (curve[selectedId].points[0].x - disX), (curve[selectedId].points[0].y - disY));
                temp_pts = curve[selectedId];
                break;
            case 8:
                square[selectedId].points[0].x = start_x;
                square[selectedId].points[0].y = start_y;

                square[selectedId].points[1].x = current_x;
                square[selectedId].points[1].y = current_y;

                square[selectedId].points[2].x = pt[2][0][0];
                square[selectedId].points[2].y = pt[2][1][0];

                square[selectedId].points[3].x = pt[3][0][0];
                square[selectedId].points[3].y = pt[3][1][0];

                square[selectedId].rotation = temp_pts.rotation;

                myTranslate(8, cx, cy);
                var newMidx = ( square[selectedId].points[0].x + square[selectedId].points[2].x)/2;
                var newMidy = (square[selectedId].points[0].y + square[selectedId].points[2].y)/2;
                var disX = newMidx - square[selectedId].points[0].x;
                var disY = newMidy - square[selectedId].points[0].y;
                myTranslate(8, (square[selectedId].points[0].x - disX), (square[selectedId].points[0].y - disY));
                temp_pts = square[selectedId];
                break;
            case 9:
    
                for(var b = 0; b < pentagon[selectedId].numberPts; b++){
                    pentagon[selectedId].points[b].x = pt[b][0][0];
                    pentagon[selectedId].points[b].y = pt[b][1][0];

                }

                pentagon[selectedId].rotation = temp_pts.rotation


                myTranslate(9, cx, cy);
                var sumX = 0;
                var sumY =0
                for(var i = 0 ;i < pentagon[selectedId].numberPts; i++){
                    sumX = pentagon[selectedId].points[i].x + sumX;
                    sumY = pentagon[selectedId].points[i].y +sumY;
                }
                var newMidx = sumX/5;
                var newMidy =sumY/5;
                var disX = newMidx - pentagon[selectedId].points[4].x;
                var disY = newMidy - pentagon[selectedId].points[4].y;
                myTranslate(9, (pentagon[selectedId].points[4].x - disX), (pentagon[selectedId].points[4].y - disY));
                temp_pts = pentagon[selectedId];
                break;
          
    }

    start_x = temp_pts.points[0].x;
    start_y = temp_pts.points[0].y;

    if(manual != true){
        ctx2.moveTo(start_x, start_y);
        if (numPoints ==1){

        }

        else if(numPoints == 6){
            ctx2.quadraticCurveTo(temp_pts.points[1].x, temp_pts.points[1].y, temp_pts.points[2].x, temp_pts.points[2].y);
        }
        else if(numPoints == 7){
         
        }
        else{
            for(var j = 1; j< temp_pts.numberPts; j++){
                ctx2.lineTo(temp_pts.points[j].x, temp_pts.points[j].y);
            }
        }
        ctx2.stroke();
    }

}


// uses current_x and current_y for when doing a manual call (from other functions, not mouse movements)
// translate puts first point of shape to where the cursor is
function myTranslate(numPoints, current_x, current_y){
    var manual = true;
    if((typeof current_x) == 'undefined'){
        manual = false;
    }

    var canvas = document.getElementById( "gl-canvas" );
    
    if (canvas.getContext) {
        var ctx2 = canvas.getContext('2d');
    }
    canvas.onmousedown = function(event){
        drag =true;
        var pos = getMousePos(canvas, event)
        
        ctx2.clearRect(0, 0, canvas.width, canvas.height);

        switch(numPoints){
            case 1:
                undoArr.push(JSON.parse(JSON.stringify(circle[selectedId])));
                break;
            case 2:
                undoArr.push(JSON.parse(JSON.stringify(line[selectedId])));
                break;
            case 3:
                undoArr.push(JSON.parse(JSON.stringify(triangle[selectedId])));
                break;
            case 4:
                undoArr.push(JSON.parse(JSON.stringify(rect[selectedId])));
                break;
            case 5:
                undoArr.push(JSON.parse(JSON.stringify(polygon[selectedId])));
                break;
            case 6:
                undoArr.push(JSON.parse(JSON.stringify(curve[selectedId])));
                break;
            case 7:
                undoArr.push(JSON.parse(JSON.stringify(ellipse[selectedId])));
                break;
            case 8:
                undoArr.push(JSON.parse(JSON.stringify(square[selectedId])));
                break;
            case 9:
                undoArr.push(JSON.parse(JSON.stringify(pentagon[selectedId])));
                break;

        }

        reDrawHelper();

        // switch case for drawing other shapes
        imageData = ctx2.getImageData(0,0,canvas.width,canvas.height);
        switch(numPoints){
            case 1:
                temp_pts = circle[selectedId];
                color = "orange";
                break;
            case 2:
                temp_pts = line[selectedId];
                color = "red";
                break;
            case 3:
                temp_pts = triangle[selectedId];
                color = "Seagreen"
                break;
            case 4:
                temp_pts = rect[selectedId];
                color = "YellowGreen";
                break;
            case 5:
                temp_pts = polygon[selectedId];
                color = "Teal";
                break;
            case 6:
                temp_pts = curve[selectedId];
                color = "SteelBlue"
                break;
            case 7:
                temp_pts = ellipse[selectedId];
                color = "RebeccaPurple";
                break;
            case 8:
                temp_pts = square[selectedId];
                color = "SkyBlue";
                break;
            case 9:
                temp_pts = pentagon[selectedId];
                color = "LightCoral";
                break;

        }
    }

    if (manual == false){
        canvas.onmousemove = function (event){
            if (drag == true){
            var pos = getMousePos(canvas, event);
            current_x = pos.x;
            current_y = pos.y;
            ctx2.putImageData(imageData, 0, 0);
            drawTranslation(numPoints, manual, canvas, current_x, current_y);
            }
        }
    }

    else{
        switch(numPoints){
            case 1:
                temp_pts = circle[selectedId];
                color = "orange";
                break;
            case 2:
                temp_pts = line[selectedId];
                color = "red";
                break;
            case 3:
                temp_pts = triangle[selectedId];
                color = "Seagreen"
                break;
            case 4:
                temp_pts = rect[selectedId];
                color = "YellowGreen";
                break;
            case 5:
                temp_pts = polygon[selectedId];
                color = "Teal";
                break;
            case 6:
                temp_pts = curve[selectedId];
                color = "SteelBlue"
                break;
            case 7:
                temp_pts = ellipse[selectedId];
                color = "RebeccaPurple";
                break;
            case 8:
                temp_pts = square[selectedId];
                color = "SkyBlue";
                break;
            case 9:
                temp_pts = pentagon[selectedId];
                color = "LightCoral";
                break;

        }
       

        ctx2.putImageData(imageData, 0, 0);
        drawTranslation(numPoints, manual, canvas, current_x, current_y);
    }
    canvas.onmouseup = function (event){  
        
        drag = false;
    }
}

function drawTranslation(numPoints, manual, canvas, current_x, current_y){  // clean up parameters
    if (canvas.getContext) {
        var ctx2 = canvas.getContext('2d');
    }
        
    ctx2.beginPath();
    ctx2.lineWidth = "3";
    ctx2.strokeStyle = color;
    
    var distancex = current_x - temp_pts.points[0].x;
    var distancey = current_y - temp_pts.points[0].y;
    if(numPoints == 9){
        var distancex = current_x - temp_pts.points[4].x;
        var distancey = current_y - temp_pts.points[4].y;
    }
    var matrix1 = translatem(([distancex, distancey, 0]), 0 , 0);
    var pt = [];
    if(numPoints == 1){
        pt.push(mult(matrix1, (pointMat(temp_pts.points[0].x, temp_pts.points[0].y, 0))));
        pt.push(mult(matrix1, (pointMat(temp_pts.points[1].x, temp_pts.points[1].y, 0))));

        start_x = pt[0][0][0];
        start_y = pt[0][1][0];
        current_x = pt[1][0][0];
        current_y = pt[1][1][0];

        var centerx = (start_x + current_x)/2;
        var centery = (start_y + current_y)/2;
        var radius = Math.sqrt(Math.pow((centerx - start_x),2) + Math.pow((centery - start_y), 2));
        ctx2.arc(centerx, centery, radius, 0, 2*Math.PI);
        ctx2.stroke(); // Draw it

    }
      
    else if(numPoints ==5){
        for(var i= 0; i< temp_pts.numberPts; i++){
            pt.push(mult(matrix1, (pointMat(temp_pts.points[i].x, temp_pts.points[i].y, 0))));
        }
        start_x = pt[0][0][0];
        start_y = pt[0][1][0];
        ctx2.moveTo(start_x, start_y);

        for(var j = 1; j< temp_pts.numberPts; j++){
            ctx2.lineTo(pt[j][0][0], pt[j][1][0]);
        }
        //ctx2.closePath();
        ctx2.stroke(); // Draw it
    }
    else if(numPoints ==6){
        for(var i= 0; i< 3; i++){
            pt.push(mult(matrix1, (pointMat(temp_pts.points[i].x, temp_pts.points[i].y, 0))));
        }
        start_x = pt[0][0][0];
        start_y = pt[0][1][0];
        ctx2.moveTo(start_x, start_y);

        ctx2.quadraticCurveTo(pt[1][0][0], pt[1][1][0], pt[2][0][0], pt[2][1][0]);
        ctx2.stroke(); // Draw it
    }
    else if(numPoints ==7){
        for(var i= 0; i< 2; i++){
            pt.push(mult(matrix1, (pointMat(temp_pts.points[i].x, temp_pts.points[i].y, 0))));
        }
        start_x = pt[0][0][0];
        start_y = pt[0][1][0];
        var centerx = ( pt[0][0][0] +  pt[1][0][0])/2;
        var centery = ( pt[0][1][0] +  pt[1][1][0])/2;
        var radiusx = pt[1][0][0] - centerx;
        var radiusy = pt[1][1][0] - centery;
        ctx2.ellipse(centerx, centery, temp_pts.radiusX, temp_pts.radiusY, (temp_pts.rotation) , 0, 2*Math.PI);
        ctx2.stroke(); // Draw it
    }

    else{
        
      
        for(var i= 0; i< temp_pts.numberPts; i++){
            pt.push(mult(matrix1, (pointMat(temp_pts.points[i].x, temp_pts.points[i].y, 0))));
        }
        
        start_x = pt[0][0][0];
        start_y = pt[0][1][0];
        ctx2.moveTo(start_x, start_y);

        for(var j = 1; j< temp_pts.numberPts; j++){
            ctx2.lineTo(pt[j][0][0], pt[j][1][0]);
        }
        ctx2.closePath();
        ctx2.stroke(); // Draw it
                
    }
       
        switch(numPoints){
            case 1:
                circle[selectedId].points[0].x = start_x;
                circle[selectedId].points[0].y = start_y;

                circle[selectedId].points[1].x = current_x;
                circle[selectedId].points[1].y = current_y;

                break;
            case 2:
                line[selectedId].points[0].x = start_x;
                line[selectedId].points[0].y = start_y;
                line[selectedId].points[1].x = pt[1][0][0];
                line[selectedId].points[1].y = pt[1][1][0];

                break;
            case 3:
                triangle[selectedId].points[0].x = start_x;
                triangle[selectedId].points[0].y = start_y;

                triangle[selectedId].points[1].x = pt[1][0][0];
                triangle[selectedId].points[1].y = pt[1][1][0];

                triangle[selectedId].points[2].x = pt[2][0][0];
                triangle[selectedId].points[2].y = pt[2][1][0];

                break;
            case 4:
                rect[selectedId].points[0].x = pt[0][0][0];
                rect[selectedId].points[0].y = pt[0][1][0];

                rect[selectedId].points[1].x = pt[1][0][0];
                rect[selectedId].points[1].y = pt[1][1][0];

                rect[selectedId].points[2].x = pt[2][0][0];
                rect[selectedId].points[2].y = pt[2][1][0];

                rect[selectedId].points[3].x = pt[3][0][0];
                rect[selectedId].points[3].y = pt[3][1][0];

                break;
            case 5:
                for(var b= 0; b< temp_pts.numberPts; b++){
                    polygon[selectedId].points[b].x = pt[b][0][0];
                    polygon[selectedId].points[b].y = pt[b][1][0];
                }
                break;
            case 6:
                for(var b= 0; b< 3; b++){
                    curve[selectedId].points[b].x = pt[b][0][0];
                    curve[selectedId].points[b].y= pt[b][1][0]
                }
                break;
            case 7:
                for(var b= 0; b< 2; b++){
                    ellipse[selectedId].points[b].x = pt[b][0][0];
                    ellipse[selectedId].points[b].y= pt[b][1][0]
                }
                ellipse[selectedId].centerX = centerx;
                ellipse[selectedId].centerY = centery;
                break;

            case 8:
                square[selectedId].points[0].x = start_x;
                square[selectedId].points[0].y = start_y;

                square[selectedId].points[1].x = pt[1][0][0];
                square[selectedId].points[1].y = pt[1][1][0];

                square[selectedId].points[2].x = pt[2][0][0];
                square[selectedId].points[2].y = pt[2][1][0];

                square[selectedId].points[3].x = pt[3][0][0];
                square[selectedId].points[3].y = pt[3][1][0];

                break;
             
            case 9:
                for(var b= 0; b< temp_pts.numberPts; b++){
                    pentagon[selectedId].points[b].x = pt[b][0][0];
                    pentagon[selectedId].points[b].y= pt[b][1][0]
                }

                break;
            } 
}

function myScale(numPoints){
    var canvas = document.getElementById( "gl-canvas" );
    
    if (canvas.getContext) {
        var ctx2 = canvas.getContext('2d');
    }
    canvas.onmousedown = function(event){
        drag =true;
        var pos = getMousePos(canvas, event);        
        ctx2.clearRect(0, 0, canvas.width, canvas.height);

        switch(numPoints){
            case 1:
                undoArr.push(JSON.parse(JSON.stringify(circle[selectedId])));
                break;
            case 2:
                undoArr.push(JSON.parse(JSON.stringify(line[selectedId])));
                break;
            case 3:
                undoArr.push(JSON.parse(JSON.stringify(triangle[selectedId])));
                break;
            case 4:
                undoArr.push(JSON.parse(JSON.stringify(rect[selectedId])));
                break;
            case 5:
                undoArr.push(JSON.parse(JSON.stringify(polygon[selectedId])));
                break;
            case 6:
                undoArr.push(JSON.parse(JSON.stringify(curve[selectedId])));
                break;
            case 7:
                undoArr.push(JSON.parse(JSON.stringify(ellipse[selectedId])));
                break;
            case 8:
                undoArr.push(JSON.parse(JSON.stringify(square[selectedId])));
                break;
            case 9:
                undoArr.push(JSON.parse(JSON.stringify(pentagon[selectedId])));
                break;

        }

        reDrawHelper();

        // switch case for drawing other shapes
        imageData = ctx2.getImageData(0,0,canvas.width,canvas.height);
        switch(numPoints){
            case 1:
                temp_pts = circle[selectedId];
                color = "orange";
                break;
            case 2:
                temp_pts = line[selectedId];
                color = "red";
                break;
            case 3:
                temp_pts = triangle[selectedId];
                color = "seagreen"
                break;
            case 4:
                temp_pts = rect[selectedId];
                color = "YellowGreen";
                break;
            case 5:
                temp_pts = polygon[selectedId];
                color = "Teal";
                break;
            case 6:
                temp_pts = curve[selectedId];
                color = "SteelBlue"
                break;
            case 7:
                temp_pts = ellipse[selectedId];
                color = "RebeccaPurple";
                break;
            case 8:
                temp_pts = square[selectedId];
                color = "SkyBlue"
                break;
            case 9:
                temp_pts = pentagon[selectedId];
                pent_ogx = temp_pts.points[4].x;
                pent_ogy = temp_pts.points[4].y;
                color = "LightCoral";
                break;
        }
        og_startx = temp_pts.points[0].x;
        og_starty = temp_pts.points[0].y;
  
    }

    canvas.onmousemove = function (event){
        if (drag == true){
            var pos = getMousePos(canvas, event);
            var current_x, current_y;
            current_x = pos.x;
            current_y = pos.y;
            ctx2.putImageData(imageData, 0, 0);
            ctx2.beginPath();
            ctx2.lineWidth = "3";
            ctx2.strokeStyle = color;

            var pt = [];
            if(numPoints != 1){
                switch(numPoints){
                    case 2:
                        if(temp_pts.rotation !=0){ // if we are scaling an already rotated object
                            
                            myRotate(2,-(temp_pts.rotation)); // un-rotate
                        }
                        var sx = current_x/temp_pts.points[1].x;
                        var sy = current_y/temp_pts.points[1].y;
                        break;
                    case 3:
                        if(temp_pts.rotation !=0){
                            myRotate(3,-(temp_pts.rotation));
                        }
                        var sx = current_x/temp_pts.points[1].x; 
                        var sy = current_y/temp_pts.points[1].y;
                        break;
                    case 4:
                        if(temp_pts.rotation !=0){
                            myRotate(4,-(temp_pts.rotation));
                        }
                        var sx = current_x/temp_pts.points[2].x;  //using bottom right point of rect for scaling value
                        var sy = current_y/temp_pts.points[2].y;
                        break;
                    case 5:
                        if(temp_pts.rotation !=0){
                            myRotate(5,-(temp_pts.rotation));
                        }
                        var middlePoint = Math.round(temp_pts.numberPts/2) - 1;
                        var sx = current_x/temp_pts.points[middlePoint].x;
                        var sy = current_y/temp_pts.points[middlePoint].y;
                        break;
                    case 6:
                        if(temp_pts.rotation !=0){
                            myRotate(6,-(temp_pts.rotation));
                        }
                        var sx = current_x/temp_pts.points[2].x;
                        var sy = current_y/temp_pts.points[2].y;
                        break;
                    case 8:
                        if(temp_pts.rotation !=0){
                            myRotate(8,-(temp_pts.rotation));
                        }
                        var sx = current_x/temp_pts.points[2].x;
                        var sy = current_y/temp_pts.points[2].y;
                        break;
                    case 9:
                        if(temp_pts.rotation !=0){
                            myRotate(8,-(temp_pts.rotation));
                        }
                        var sx = current_x/temp_pts.points[1].x;
                        var sy = current_y/temp_pts.points[1].y;
                        break;
    


                }
               
                var matrix1 = scalem(([sx, sy, 0]), 0 , 0);
 
                for(var i = 0; i< temp_pts.numberPts; i++){
                    pt.push(mult(matrix1, (pointMat(temp_pts.points[i].x, temp_pts.points[i].y, 0))));
                }
 
                start_x = pt[0][0][0];
                start_y = pt[0][1][0];
                var l_start_x = temp_pts.points[0].x; // line's starts
                var l_start_y = temp_pts.points[0].y;
                
            }

            if(numPoints == 1){
                var centerx = (temp_pts.points[0].x + current_x)/2;
                var centery = (temp_pts.points[0].y + current_y)/2;
                var radius = Math.sqrt(Math.pow((centerx - temp_pts.points[0].x),2) + Math.pow((centery - temp_pts.points[0].y), 2));
                ctx2.lineWidth = "3";
                ctx2.arc(centerx, centery, radius, 0, 2*Math.PI);
                ctx2.stroke();
            }
            if(numPoints == 7){
                var centerx = (temp_pts.points[0].x + current_x)/2;
                var centery = (temp_pts.points[0].y + current_y)/2;
                var radiusx = current_x - centerx;
                var radiusy = current_y - centery;
                // var radius = Math.sqrt(Math.pow((centerx - temp_pts.points[0].x),2) + Math.pow((centery - temp_pts.points[0].y), 2));
                ctx2.lineWidth = "3";
                ctx2.ellipse(centerx, centery, radiusx, radiusy, temp_pts.rotation, 0, 2*Math.PI);
                ctx2.stroke();
            }

            if(numPoints == 8){
                var diagLength = Math.sqrt(Math.pow(current_x - temp_pts.points[0].x, 2) + Math.pow(current_y - temp_pts.points[0].y, 2));
                var sideLength = Math.sqrt(2)* (diagLength/2);

                var pt2_x = temp_pts.points[0].x + sideLength;
                var pt2_y = temp_pts.points[0].y;
                var pt3_x = pt2_x;
                var pt3_y = pt2_y + sideLength;
                var pt4_x = temp_pts.points[0].x;
                var pt4_y = temp_pts.points[0].y + sideLength;
                ctx2.moveTo(temp_pts.points[0].x, temp_pts.points[0].y);
                ctx2.lineTo(pt2_x, pt2_y);
                ctx2.lineTo(pt3_x, pt3_y);
                ctx2.lineTo(pt4_x, pt4_y);
                ctx2.closePath();
                ctx2.stroke();
            }
 
 
            switch(numPoints){
                case 1:
  
                    circle[selectedId].points[1].x = current_x;
                    circle[selectedId].points[1].y = current_y;

                    break;
                case 2:
                    line[selectedId].points[0].x = l_start_x;
                    line[selectedId].points[0].y = l_start_y;

                    line[selectedId].points[1].x = pt[1][0][0];
                    line[selectedId].points[1].y = pt[1][1][0];
 
                    myTranslate(2, og_startx, og_starty); // allows to be scaled with first point as anchor
                    if(temp_pts.rotation!=0){
                        myRotate(2,(temp_pts.rotation)); // re-rotate after scaling (for already rotated shapes)
                    }
                    break;
                case 3:
                    triangle[selectedId].points[0].x = start_x;
                    triangle[selectedId].points[0].y = start_y;

                    triangle[selectedId].points[1].x = pt[1][0][0];
                    triangle[selectedId].points[1].y = pt[1][1][0];

                    triangle[selectedId].points[2].x = pt[2][0][0];
                    triangle[selectedId].points[2].y = pt[2][1][0];

                    myTranslate(3, og_startx, og_starty);
                    if(temp_pts.rotation !=0){
                        myRotate(3,(temp_pts.rotation));
                    }                    
                    break;
                case 4:

                    rect[selectedId].points[0].x = start_x;
                    rect[selectedId].points[0].y = start_y;
    
                    rect[selectedId].points[1].x = pt[1][0][0];
                    rect[selectedId].points[1].y = pt[1][1][0];
    
                    rect[selectedId].points[2].x = pt[2][0][0];
                    rect[selectedId].points[2].y = pt[2][1][0];
    
                    rect[selectedId].points[3].x = pt[3][0][0];
                    rect[selectedId].points[3].y = pt[3][1][0];
                   
                    myTranslate(4, og_startx, og_starty);
                    if(temp_pts.rotation !=0){
                        myRotate(4,(temp_pts.rotation));
                    }
                    break;
                case 5: 
                    for(var b=0; b< temp_pts.numberPts; b++){
                        polygon[selectedId].points[b].x = pt[b][0][0];
                        polygon[selectedId].points[b].y = pt[b][1][0];
                    }
                    myTranslate(5, og_startx, og_starty);
                    if(temp_pts.rotation !=0){
                        myRotate(5,(temp_pts.rotation));
                    }
                    break;
                case 6: 
                    for(var b=0; b< 3; b++){
                        curve[selectedId].points[b].x = pt[b][0][0];
                        curve[selectedId].points[b].y = pt[b][1][0];
                    }
                    myTranslate(6, og_startx, og_starty);
                    if(temp_pts.rotation !=0){
                        myRotate(6,(temp_pts.rotation));
                    }
                    break;
                case 7:

                    ellipse[selectedId].points[1].x = current_x;
                    ellipse[selectedId].points[1].y = current_y;
                    ellipse[selectedId].centerX = centerx;
                    ellipse[selectedId].centerY = centery;
                    ellipse[selectedId].radiusX = radiusx;
                    ellipse[selectedId].radiusY = radiusy;
                    break;
                case 8:
    
                    square[selectedId].points[1].x = pt2_x;
                    square[selectedId].points[1].y = pt2_y;
    
                    square[selectedId].points[2].x = pt3_x;
                    square[selectedId].points[2].y = pt3_y;
    
                    square[selectedId].points[3].x = pt4_x;
                    square[selectedId].points[3].y = pt4_y;
                    myTranslate(8, og_startx, og_starty);
                    if(temp_pts.rotation !=0){
                        myRotate(8,(temp_pts.rotation));
                    }
                    break;
                case 9: 
                for(var b=0; b< temp_pts.numberPts; b++){
                    pentagon[selectedId].points[b].x = pt[b][0][0];
                    pentagon[selectedId].points[b].y = pt[b][1][0];
                }
                myTranslate(9, pent_ogx, pent_ogy);
                if(temp_pts.rotation !=0){
                    myRotate(9,(temp_pts.rotation));
                }
                break;
                    
            }

        }
    }
    canvas.onmouseup = function (event){
        drag = false;
    }
}


function getMousePos(canvas, evt) { //https://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

//makes 4x4 matrix for points (explained in drawRotation)
function pointMat()
{
    var v = _argumentsToArray( arguments );

    var m = [];

    m = [
        vec4(v[0],0.0, 0.0, 0.0),
        vec4(v[1],0.0, 0.0, 0.0),
        vec4(v[2], 0.0, 0.0, 0.0),
        vec4((1), 0.0, 0.0 ,0.0)
    ];
    m.matrix = true;
    return m;
}

function drawLine(newLine){
    var canvas = document.getElementById( "gl-canvas" );
    
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
    }
    var manual;
    if((typeof newLine ) == 'undefined'){
        manual = false;
    }
    else{
        manual = true;
        selectedId = lineCnt;
        newLine.ID = lineCnt;
        lineCnt++;
        drag = false;
        line.push(JSON.parse(JSON.stringify(newLine)));
        var temp = JSON.parse(JSON.stringify(newLine));
        temp.points[0].x = 0;
        temp.points[0].y = 0;
        temp.points[1].x = 0;
        temp.points[1].y = 0;
        undoArr.push(JSON.parse(JSON.stringify(temp)));
        myTranslate(2, newLine.points[0].x + paste_offset, newLine.points[0].y + paste_offset);
        reDrawHelper();
        paste_offset= paste_offset +10;
        ctx.beginPath();
        ctx.lineWidth = "3";
        ctx.strokeStyle = "red";
        ctx.moveTo(newLine.points[0].x, newLine.points[0].y);
        ctx.lineTo(newLine.points[1].x, newLine.points[1].y);
        ctx.stroke(); // Draw it


    }
    if(manual == false){
        canvas.onmousedown = function(event){
            drag =true;
            var pos = getMousePos(canvas, event);
            
            start_x = pos.x;
            start_y = pos.y;
            imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        }

        canvas.onmousemove = function (event){
            if (drag == true){
                var pos = getMousePos(canvas, event);
                var current_x, current_y;
                current_x = pos.x;
                current_y = pos.y;
                ctx.putImageData(imageData, 0, 0);
                ctx.beginPath();
                ctx.lineWidth = "3";
                ctx.strokeStyle = "red";
                ctx.moveTo(start_x, start_y);
                ctx.lineTo(current_x, current_y);
                ctx.stroke(); // Draw it

                    line_j = 
                    {
                        "type": "line",
                        "numberPts":2,
                        "rotation":0,
                        "points":[{
                            "x": start_x,
                            "y": start_y,
                        },
                        {
                            "x": current_x,
                            "y" : current_y,
                        }
                        ],
                        "ID" : lineCnt,
                        "typeNum" : 2,

                    }
                

            }
        }

        canvas.onmouseup = function (event){
            if(selectMode == false){
                lineCnt++;
                drag = false;
                line.push(JSON.parse(JSON.stringify(line_j)));
                line_j.points[0].x = 0;
                line_j.points[0].y = 0;
                line_j.points[1].x = 0;
                line_j.points[1].y = 0;
                undoArr.push(JSON.parse(JSON.stringify(line_j)));
            }
        }
    }
   
}

function drawCircle(newCircle){
    var canvas = document.getElementById( "gl-canvas" );
    
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
    }
    var manual;
    if((typeof newCircle ) == 'undefined'){
        manual = false;
    }
    else{
        manual = true;
     
        selectedId = circleCnt;
        newCircle.ID = circleCnt;
        circleCnt++;
        drag = false;
        circle.push(JSON.parse(JSON.stringify(newCircle)));
        var temp = JSON.parse(JSON.stringify(newCircle));
        temp.points[0].x = 0;
        temp.points[0].y = 0;
        temp.points[1].x = 0;
        temp.points[1].y = 0;
        undoArr.push(JSON.parse(JSON.stringify(temp)));
        myTranslate(1, newCircle.points[0].x + paste_offset, newCircle.points[0].y + paste_offset);
        reDrawHelper();
        paste_offset= paste_offset +10;
        ctx.beginPath();
        ctx.lineWidth = "3";
        ctx.strokeStyle = "orange";
        var centerx = (circle[selectedId].points[0].x + circle[selectedId].points[1].x)/2;
        var centery = (circle[selectedId].points[0].y + circle[selectedId].points[1].y)/2;
        var radius = Math.sqrt(Math.pow((centerx - (circle[selectedId].points[0].x),2) + Math.pow((centery - circle[selectedId].points[0].y), 2)));
        ctx.arc(centerx, centery, radius, 0, 2*Math.PI);
        ctx.stroke(); // Draw it


    }
    if(manual == false){
        canvas.onmousedown = function(event){
            drag =true;
            var pos = getMousePos(canvas, event);
            
            start_x = pos.x;
            start_y = pos.y;
            imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        }

        canvas.onmousemove = function (event){
            if (drag == true){
                var pos = getMousePos(canvas, event);
                var current_x, current_y;
                current_x = pos.x;
                current_y = pos.y;
                ctx.putImageData(imageData, 0, 0);
                ctx.beginPath();

                // finc center, find radius
                var centerx = (start_x + current_x)/2;
                var centery = (start_y + current_y)/2;
                var radius = Math.sqrt(Math.pow((centerx - start_x),2) + Math.pow((centery - start_y), 2));
                ctx.lineWidth = "3";
                ctx.strokeStyle = "orange";
                ctx.arc(centerx, centery, radius, 0, 2*Math.PI);
                ctx.stroke(); // Draw it

                circle_j = 
                {
                    "type":"circle",
                    "numberPts":2,
                    "rotation":0,
                    "points": 
                    [
                        {
                            "x":start_x,
                            "y": start_y,
                        },
                        {
                            "x": current_x,
                            "y" : current_y,
                        },
                    ],
                    "ID" : circleCnt,
                    "typeNum" : 1,

                }

            }
        }

        canvas.onmouseup = function (event){
            if( selectMode == false){
                circleCnt++;
                drag = false;
                circle.push(JSON.parse(JSON.stringify(circle_j)));
                circle_j.points[0].x = 0;
                circle_j.points[0].y = 0;
                circle_j.points[1].x = 0;
                circle_j.points[1].y = 0;
                undoArr.push(JSON.parse(JSON.stringify(circle_j)));
            }
        }
    }
}

function drawRectangle(newRect){
    var canvas = document.getElementById( "gl-canvas" );
    
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
    }
    var manual;
    if((typeof newRect ) == 'undefined'){
        manual = false;
    }
    else{
        manual = true;
     
        selectedId = rectCnt;
        newRect.ID = rectCnt;
        rectCnt++;
        drag = false;
        rect.push(JSON.parse(JSON.stringify(newRect)));
        var temp = JSON.parse(JSON.stringify(newRect));
        temp.points[0].x = 0;
        temp.points[0].y = 0;
        temp.points[1].x = 0;
        temp.points[1].y = 0;
        temp.points[2].x = 0;
        temp.points[2].y = 0;
        temp.points[3].x = 0;
        temp.points[3].y = 0;
        undoArr.push(JSON.parse(JSON.stringify(temp)));
        myTranslate(4, newRect.points[0].x + paste_offset, newRect.points[0].y + paste_offset);
        reDrawHelper();
        paste_offset= paste_offset +10;
        ctx.beginPath();
        ctx.lineWidth = "3";
        ctx.strokeStyle = "YellowGreen";
        ctx.moveTo(rect[selectedId].points[0].x, rect[selectedId].points[0].y);
        for(var i = 1; i < rect[selectedId].numberPts; i++){
            ctx.lineTo(rect[selectedId].points[i].x, rect[selectedId].points[i].y);
        }
        ctx.stroke(); // Draw it


    }
    if(manual == false){
        canvas.onmousedown = function(event){
            drag =true;
            var pos = getMousePos(canvas, event);
            
            start_x = pos.x;
            start_y = pos.y;
            imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
            selectMode = false;
        }

        canvas.onmousemove = function (event){
            if (drag == true){
                var pos = getMousePos(canvas, event);
                var current_x, current_y;
                current_x = pos.x;
                current_y = pos.y;
                ctx.putImageData(imageData, 0, 0);
                ctx.beginPath();
                ctx.lineWidth = "3";
                ctx.strokeStyle = "YellowGreen";
                var t_right_x = current_x; //top right
                var t_right_y = start_y;
                var b_left_x = start_x; // bottom left
                var b_left_y = current_y;

                ctx.moveTo(start_x, start_y);
                ctx.lineTo(t_right_x, t_right_y);
                ctx.lineTo(current_x, current_y);
                ctx.lineTo(b_left_x, b_left_y);
                ctx.lineTo(start_x, start_y);
                ctx.stroke(); // Draw it
                rect_j =
                {
                    "type" : "rectangle",
                    "numberPts": 4,
                    "rotation" : 0,
                    "points":[
                    {
                        "x": start_x,
                        "y": start_y,
                    },
                    {
                        "x" : t_right_x,
                        "y" : t_right_y,
                    },
                    {
                        "x" : current_x,
                        "y" : current_y,
                    },
                    {
                        "x" : b_left_x,
                        "y" : b_left_y,
                    },
                    
                    ],
                    "ID" : rectCnt,
                    "typeNum" : 4,

                };
            

            }
        }

        canvas.onmouseup = function (event){
            if(selectMode == false){
                rectCnt++;
                drag = false;
                rect.push(JSON.parse(JSON.stringify(rect_j)));
                rect_j.points[0].x = 0;
                rect_j.points[0].y = 0;
                rect_j.points[1].x = 0;
                rect_j.points[1].y = 0;
                rect_j.points[2].x = 0;
                rect_j.points[2].y = 0;
                rect_j.points[3].x = 0;
                rect_j.points[3].y = 0;
                undoArr.push(JSON.parse(JSON.stringify(rect_j)));
            }
        }
    }

}

function drawTriangle(newTriangle){
    var canvas = document.getElementById( "gl-canvas" );
    
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
    }
    var manual;
    if((typeof newTriangle ) == 'undefined'){
        manual = false;
    }
    else{
        manual = true;
     
        selectedId = triangleCnt;
        newTriangle.ID = triangleCnt;
        triangleCnt++;
        drag = false;
        triangle.push(JSON.parse(JSON.stringify(newTriangle)));
        var temp = JSON.parse(JSON.stringify(newTriangle));
        temp.points[0].x = 0;
        temp.points[0].y = 0;
        temp.points[1].x = 0;
        temp.points[1].y = 0;
        temp.points[2].x = 0;
        temp.points[2].y = 0;
        undoArr.push(JSON.parse(JSON.stringify(temp)));
        myTranslate(3, newTriangle.points[0].x + paste_offset, newTriangle.points[0].y + paste_offset);
        reDrawHelper();
        paste_offset= paste_offset +10;
        ctx.beginPath();
        ctx.lineWidth = "3";
        ctx.strokeStyle = "SeaGreen";
        ctx.moveTo(triangle[selectedId].points[0].x, triangle[selectedId].points[0].y);
        for(var i = 1; i < triangle[selectedId].numberPts; i++){
            ctx.lineTo(triangle[selectedId].points[i].x, triangle[selectedId].points[i].y);
        }
        ctx.stroke(); // Draw it

    }
    if(manual == false){
        canvas.onmousedown = function(event){
            drag =true;
            var pos = getMousePos(canvas, event);
            
            start_x = pos.x;
            start_y = pos.y;
            imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        }

        canvas.onmousemove = function (event){
            if (drag == true){
                var pos = getMousePos(canvas, event);
                var current_x, current_y;
                current_x = pos.x;
                current_y = pos.y;
                ctx.putImageData(imageData, 0, 0);
                ctx.beginPath();
                ctx.lineWidth = "3";
                ctx.strokeStyle = "SeaGreen";
                var pt_3_x = current_x - start_x; // calculate third triangle point (creates isosceles triangle)
                pt_3_x = start_x - pt_3_x;
                ctx.moveTo(start_x, start_y);
                ctx.lineTo(current_x, current_y);
                ctx.lineTo(pt_3_x, current_y);
                ctx.lineTo(start_x, start_y);
                ctx.stroke();

                triangle_j = 
                {
                    "type": "triangle",
                    "numberPts": 3,
                    "rotation": 0,
                    "points":[
                        {
                            "x":start_x,
                            "y":start_y,
                        },
                        {
                            "x": current_x,
                            "y": current_y,
                        },
                        {
                            "x": pt_3_x,
                            "y": current_y,
                        },
                    ],
                    "ID": triangleCnt,
                    "typeNum" : 3,
                }

            }
        }
        canvas.onmouseup = function (event){
            if(selectMode == false){
                triangleCnt++;
                drag = false;
                triangle.push(JSON.parse(JSON.stringify(triangle_j)));
                triangle_j.points[0].x = 0;
                triangle_j.points[0].y = 0;
                triangle_j.points[1].x = 0;
                triangle_j.points[1].y = 0;
                triangle_j.points[2].x = 0;
                triangle_j.points[2].y = 0;
                undoArr.push(JSON.parse(JSON.stringify(triangle_j)));
            };
        }
    }
}


function drawSquare(newSquare){
    var canvas = document.getElementById( "gl-canvas" );
    
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
    }
    var manual;
    if((typeof newSquare ) == 'undefined'){
        manual = false;
    }
    else{
        manual = true;
     
        selectedId = squareCnt;
        newSquare.ID = squareCnt;
        squareCnt++;
        drag = false;
        square.push(JSON.parse(JSON.stringify(newSquare)));
        var temp = JSON.parse(JSON.stringify(newSquare));
        temp.points[0].x = 0;
        temp.points[0].y = 0;
        temp.points[1].x = 0;
        temp.points[1].y = 0;
        temp.points[2].x = 0;
        temp.points[2].y = 0;
        temp.points[3].x = 0;
        temp.points[3].y = 0;
        undoArr.push(JSON.parse(JSON.stringify(temp)));
        myTranslate(8, newSquare.points[0].x + paste_offset, newSquare.points[0].y + paste_offset);
        reDrawHelper();
        paste_offset= paste_offset +10;
        ctx.beginPath();
        ctx.lineWidth = "3";
        ctx.strokeStyle = "SkyBlue";
        ctx.moveTo(square[selectedId].points[0].x, square[selectedId].points[0].y);
        for(var i = 1; i < square[selectedId].numberPts; i++){
            ctx.lineTo(square[selectedId].points[i].x, square[selectedId].points[i].y);
        }
        ctx.stroke(); // Draw it

    }
    if(manual == false){
        canvas.onmousedown = function(event){
            drag =true;
            var pos = getMousePos(canvas, event);
            
            start_x = pos.x;
            start_y = pos.y;
            imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        }

        canvas.onmousemove = function (event){
            if (drag == true){
                var pos = getMousePos(canvas, event);
                var current_x, current_y;
                current_x = pos.x;
                current_y = pos.y;
                ctx.putImageData(imageData, 0, 0);
                ctx.beginPath();
                ctx.lineWidth = "3";
                ctx.strokeStyle = "SkyBlue";

                var diagLength = Math.sqrt(Math.pow(current_x - start_x, 2) + Math.pow(current_y - start_y, 2));
                var sideLength = Math.sqrt(2)* (diagLength/2);

                var pt2_x = start_x + sideLength;
                var pt2_y = start_y;
                var pt3_x = pt2_x;
                var pt3_y = pt2_y + sideLength;
                var pt4_x = start_x;
                var pt4_y = start_y + sideLength;
                ctx.moveTo(start_x, start_y);
                ctx.lineTo(pt2_x, pt2_y);
                ctx.lineTo(pt3_x, pt3_y);
                ctx.lineTo(pt4_x, pt4_y);
                ctx.closePath();
                ctx.stroke();

                square_j = 
                {
                    "type": "square",
                    "numberPts": 4,
                    "rotation": 0,
                    "points":[
                        {
                            "x":start_x,
                            "y":start_y,
                        },
                        {
                            "x": pt2_x,
                            "y": pt2_y,
                        },
                        {
                            "x": pt3_x,
                            "y": pt3_y,
                        },
                        {
                            "x": pt4_x,
                            "y": pt4_y,
                        }
                    ],
                    "ID": squareCnt,
                    "typeNum" : 8,
                }

            }
        }
        canvas.onmouseup = function (event){
            if(selectMode == false){
                squareCnt++;
                drag = false;
                square.push(JSON.parse(JSON.stringify(square_j)));
                square_j.points[0].x = 0;
                square_j.points[0].y = 0;
                square_j.points[1].x = 0;
                square_j.points[1].y = 0;
                square_j.points[2].x = 0;
                square_j.points[2].y = 0;
                square_j.points[3].x = 0;
                square_j.points[3].y = 0;
                undoArr.push(JSON.parse(JSON.stringify(square_j)));
            };
        }
    }
}



function drawPolygon(newPoly){
    var canvas = document.getElementById( "gl-canvas" );
    
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
    }
    countPolyPts = 0;
    var manual;
    if((typeof newPoly ) == 'undefined'){
        manual = false;
    }
    else{
        manual = true;
     
        selectedId = triangleCnt;
        newPoly.ID = triangleCnt;
        triangleCnt++;
        drag = false;
        polygon.push(JSON.parse(JSON.stringify(newPoly)));
        var temp = JSON.parse(JSON.stringify(newPoly));
        for(var i; i < temp.numberPts; i++){
            temp.points[i].x = 0;
            temp.points[i].y = 0;
        }
     
        undoArr.push(JSON.parse(JSON.stringify(temp)));
        myTranslate(5, newPoly.points[0].x + paste_offset, newPoly.points[0].y + paste_offset);
        reDrawHelper();
        paste_offset= paste_offset +10;
        ctx.beginPath();
        ctx.lineWidth = "3";
        ctx.strokeStyle = "Teal";
        ctx.moveTo(polygon[selectedId].points[0].x, polygon[selectedId].points[0].y);
        for(var i = 1; i < polygon[selectedId].numberPts; i++){
            ctx.lineTo(polygon[selectedId].points[i].x, polygon[selectedId].points[i].y);
        }
        ctx.stroke(); // Draw it
    }
    if(manual == false){

        canvas.onmousedown = function(event){
            var pos = getMousePos(canvas, event);
            
            start_x = pos.x;
            start_y = pos.y;
            imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
            if(countPolyPts == 0){
                ctx.beginPath();
                ctx.lineWidth = "3";
                ctx.strokeStyle = "Teal";
                ctx.moveTo(start_x, start_y);
            }
        
            ctx.lineTo(start_x, start_y);
            ctx.stroke();

            poly_pts[countPolyPts] =(pointMat(start_x, start_y, 0));
            countPolyPts++;
            poly_pts[countPolyPts] = 0;

            polygon_j=
            {
                "type": "polygon",
                "numberPts": countPolyPts-1,
                "rotation":0,
                "points":[
                ],
                "ID": polygonCnt,
                "typeNum" : 5,

            }

        
        
        }
        canvas.onmouseup = function (event){
            drag = false;
        }
    
        canvas.ondblclick = function(event){
            if(selectMode == false){
                polygonCnt++;
                for(var i=0; i< countPolyPts-1; i++){
                    polygon_j.points.push({x: poly_pts[i][0][0] , y: poly_pts[i][1][0]});
                }
                polygon.push(JSON.parse(JSON.stringify(polygon_j)));
                for(var i=0; i< countPolyPts-1; i++){
                    polygon_j.points[i].x = 0;
                    polygon_j.points[i].y = 0;
                }
                undoArr.push(JSON.parse(JSON.stringify(polygon_j)));

            }
        }
    }
}

function drawCurve(newCurve){
    var canvas = document.getElementById( "gl-canvas" );
    
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
    }
    countCurvePts = 0;

    var manual;
    if((typeof newCurve ) == 'undefined'){
        manual = false;
    }
    else{
        manual = true;

        selectedId = curveCnt;
        newCurve.ID = curveCnt;
        curveCnt++;
        drag = false;
        curve.push(JSON.parse(JSON.stringify(newCurve)));
        var temp = JSON.parse(JSON.stringify(newCurve));
        for(var i; i < temp.numberPts; i++){
            temp.points[i].x = 0;
            temp.points[i].y = 0;
        }
     
        undoArr.push(JSON.parse(JSON.stringify(temp)));
        myTranslate(6, newCurve.points[0].x + paste_offset, newCurve.points[0].y + paste_offset);
        reDrawHelper();
        paste_offset= paste_offset +10;
        ctx.beginPath();
        ctx.lineWidth = "3";
        ctx.strokeStyle = "SteelBlue";
        ctx.moveTo(curve[selectedId].points[0].x, curve[selectedId].points[0].y);
        ctx.quadraticCurveTo(curve[selectedId].points[1].x, curve[selectedId].points[1].y, curve[selectedId].points[2].x, curve[selectedId].points[2].y);
        ctx.stroke(); // Draw it
    }
    if(manual == false){


        canvas.onmousedown = function(event){
            var pos = getMousePos(canvas, event);
            
            start_x = pos.x;
            start_y = pos.y;
            imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
            if(countCurvePts == 0){
                ctx.beginPath();
                ctx.lineWidth = "3";
                ctx.strokeStyle = "SteelBlue";
                ctx.moveTo(start_x, start_y);
            }


            curve_j=
            {
                "type":"curve",
                "numberPts":3,
                "rotation":0,
                "points":[

                ],
                "ID" : curveCnt,
                "typeNum" : 6,

            }
        
            curve_pts[countCurvePts] =(pointMat(start_x, start_y, 0));
            countCurvePts++;
            if(countCurvePts == 3){
                for (var i =0; i< 3; i++){
                    curve_j.points.push({x:curve_pts[i][0][0], y:curve_pts[i][1][0]})
                }
                ctx.quadraticCurveTo(curve_pts[1][0][0], curve_pts[1][1][0], curve_pts[2][0][0], curve_pts[2][1][0]);
                ctx.stroke();
                curve.push(JSON.parse(JSON.stringify(curve_j)));
                curveCnt++;

                curve_j.points[0].x = 0;
                curve_j.points[0].y = 0;
                curve_j.points[1].x = 0;
                curve_j.points[1].y = 0;
                curve_j.points[2].x = 0;
                curve_j.points[2].y = 0;
                undoArr.push(JSON.parse(JSON.stringify(curve_j)));            
            }
        }
        canvas.onmouseup = function (event){
            drag = false;
        }
    }
}


function drawEllipse(newEllipse){
    var canvas = document.getElementById( "gl-canvas" );
    
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
    }
    var manual;
    if((typeof newEllipse ) == 'undefined'){
        manual = false;
    }
    else{
        manual = true;
        //line_j = newLine;
     
        selectedId = ellipseCnt;
        newEllipse.ID = ellipseCnt;
        ellipseCnt++;
        drag = false;
        ellipse.push(JSON.parse(JSON.stringify(newEllipse)));
        var temp = JSON.parse(JSON.stringify(newEllipse));
        for(var i; i < temp.numberPts; i++){
            temp.points[i].x = 0;
            temp.points[i].y = 0;
        }
     
        undoArr.push(JSON.parse(JSON.stringify(temp)));
        myTranslate(7, newEllipse.points[0].x + paste_offset, newEllipse.points[0].y + paste_offset);
        reDrawHelper();
        paste_offset= paste_offset +10;
        ctx.beginPath();
        ctx.lineWidth = "3";
        ctx.strokeStyle = "RebeccaPurple";
        ctx.ellipse(ellipse[selectMode].centerX, ellipse[selectMode].centerY, ellipse[selectMode].radiusX, ellipse[selectMode].radiusY, ellipse[selectedId].rotation, 0, 2*Math.PI);
        ctx.stroke(); // Draw it
    }
    
    canvas.onmousedown = function(event){
        drag =true;
        var pos = getMousePos(canvas, event);
        
        start_x = pos.x;
        start_y = pos.y;
        imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    }

    canvas.onmousemove = function (event){
        if (drag == true){
            var pos = getMousePos(canvas, event);
            var current_x, current_y;
            current_x = pos.x;
            current_y = pos.y;
            ctx.putImageData(imageData, 0, 0);
            ctx.beginPath();

            var centerx = (start_x + current_x)/2;
            var centery = (start_y + current_y)/2;
            var radiusx = current_x - centerx;
            var radiusy = current_y - centery;
            ctx.lineWidth = "3";
            ctx.strokeStyle = "RebeccaPurple";
            ctx.ellipse(centerx, centery, radiusx, radiusy, Math.PI, 0, 2*Math.PI);
            ctx.stroke(); // Draw it

            ellipse_j = 
            {
                "type":"ellipse",
                "numberPts":2,
                "rotation":0,
                "points": 
                [
                    {
                        "x":start_x,
                        "y": start_y,
                    },
                    {
                        "x": current_x,
                        "y" : current_y,
                    },
                ],
                "radiusX" :current_x - centerx,
                "radiusY" : current_y - centery,
                "centerX" : centerx,
                "centerY" :  centery,
                "ID": ellipseCnt,
                "typeNum" : 7,
            }


            
        }
    }

    canvas.onmouseup = function (event){
        if( selectMode == false){
            ellipseCnt++;
            drag = false;
            ellipse.push(JSON.parse(JSON.stringify(ellipse_j)));
            ellipse_j.points[0].x = 0;
            ellipse_j.points[0].y = 0;
            ellipse_j.points[1].x = 0;
            ellipse_j.points[1].y = 0;
            ellipse_j.centerX = 0;
            ellipse_j.centerY = 0;
            ellipse_j.radiusX = 0;
            ellipse_j.radiusY = 0;
            undoArr.push(JSON.parse(JSON.stringify(ellipse_j)));   
        }
    }
}


function drawPentagon(newPent){
    var canvas = document.getElementById( "gl-canvas" );
    
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
    }
    var manual;
    if((typeof newPent ) == 'undefined'){
        manual = false;
    }
    else{
        manual = true;
        //line_j = newLine;
     
        selectedId = rectCnt;
        newPent.ID = rectCnt;
        pentagonCnt++;
        drag = false;
        pentagon.push(JSON.parse(JSON.stringify(newPent)));
        var temp = JSON.parse(JSON.stringify(newPent));
        temp.points[0].x = 0;
        temp.points[0].y = 0;
        temp.points[1].x = 0;
        temp.points[1].y = 0;
        temp.points[2].x = 0;
        temp.points[2].y = 0;
        temp.points[3].x = 0;
        temp.points[3].y = 0;
        temp.points[4].x = 0;
        temp.points[4].y = 0;
        undoArr.push(JSON.parse(JSON.stringify(temp)));
        myTranslate(9, newPent.points[0].x + paste_offset, newPent.points[0].y + paste_offset);
        reDrawHelper();
        paste_offset= paste_offset + 10;
        ctx.beginPath();
        ctx.lineWidth = "3";
        ctx.strokeStyle = "LightCoral";
        ctx.moveTo(pentagon[selectedId].points[0].x, pentagon[selectedId].points[0].y);
        for(var i = 1; i < pentagon[selectedId].numberPts; i++){
            ctx.lineTo(pentagon[selectedId].points[i].x, pentagon[selectedId].points[i].y);
        }
        ctx.stroke(); // Draw it


    }
    if(manual == false){
        canvas.onmousedown = function(event){
            drag =true;
            var pos = getMousePos(canvas, event);
            
            start_x = pos.x;
            start_y = pos.y;
            imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
            selectMode = false;
            pentagon_j =
                     {
                         "type" : "pentagon",
                         "numberPts": 5,
                         "rotation" : 0,
                         "points":[ 
                            {
                                "x":0,
                                "y":0,
                            },
                            {
                                "x":0,
                                "y":0,
                            },
                            {
                                "x":0,
                                "y":0,
                            },
                            {
                                "x":0,
                                "y":0,
                            },
                            {
                                "x":0,
                                "y":0,
                            },
                         ],
                         "ID" : pentagonCnt,
                         "typeNum" : 9,
         
                     };
           
        }

        canvas.onmousemove = function (event){
            if (drag == true){
                var pos = getMousePos(canvas, event);
                var current_x, current_y;
                current_x = pos.x;
                current_y = pos.y;
                ctx.putImageData(imageData, 0, 0);
                
                var diagLength = Math.sqrt(Math.pow(current_x - start_x, 2) + Math.pow(current_y - start_y, 2))*25;
                var sideLength = diagLength * ((-1 + Math.sqrt(5))/2);
                var inradius = sideLength /(2* Math.tan(180/5));
                
    
                var centerx = start_x;
                var centery = start_y;
                var angle = 2*Math.PI/5;
                var shift = (Math.PI / 180.0) * -18;

                ctx.beginPath();
                ctx.lineWidth = "3";
                ctx.strokeStyle = "LightCoral";

                for (var i = 0; i <= 5; i++) {
                    var curStep = i * angle + shift; // fix for making pentagon straight found on stack overflow https://stackoverflow.com/questions/36529781/how-to-draw-a-simple-pentagon-in-canvas
                    ctx.lineTo (centerx + inradius*Math.cos(curStep), centery + inradius*Math.sin(curStep));
                    ctx.stroke();
                    if(i != 5){
                        pentagon_j.points[i].x = centerx + inradius*Math.cos(curStep);
                        pentagon_j.points[i].y =  centery + inradius*Math.sin(curStep);
                    }
        
                }
                ctx.stroke(); // Draw it
     
            }
        }

        canvas.onmouseup = function (event){
            if(selectMode == false){
                pentagonCnt++;
                drag = false;
                pentagon.push(JSON.parse(JSON.stringify(pentagon_j)));
                pentagon_j.points[0].x = 0;
                pentagon_j.points[0].y = 0;
                pentagon_j.points[1].x = 0;
                pentagon_j.points[1].y = 0;
                pentagon_j.points[2].x = 0;
                pentagon_j.points[2].y = 0;
                pentagon_j.points[3].x = 0;
                pentagon_j.points[3].y = 0;
                pentagon_j.points[4].x = 0;
                pentagon_j.points[4].y = 0;
                undoArr.push(JSON.parse(JSON.stringify(pentagon_j)));
            }
        }
    }

}



function reDrawShapes ( numPoints, index){
    var canvas = document.getElementById( "gl-canvas" );

    if (canvas.getContext) {
        var ctx2 = canvas.getContext('2d');
    }
    ctx2.beginPath();
    ctx2.lineWidth = "3";


    switch(numPoints){
        case 1: 
            ctx2.strokeStyle = "orange";
            var centerx = (circle[index].points[0].x + circle[index].points[1].x)/2;
            var centery = (circle[index].points[0].y + circle[index].points[1].y)/2;
            var radius = Math.sqrt(Math.pow((centerx - circle[index].points[0].x),2) + Math.pow((centery - circle[index].points[0].y), 2));
            ctx2.arc(centerx, centery, radius, 0, 2*Math.PI);
            ctx2.stroke(); // Draw it
            break;
        case 2:
            ctx2.strokeStyle = "red";
            ctx2.moveTo(line[index].points[0].x, line[index].points[0].y);
            for(var j = 1; j< line[index].numberPts; j++){
                ctx2.lineTo(line[index].points[j].x, line[index].points[j].y);
            }
            ctx2.stroke();
            break;
        case 3:
            ctx2.strokeStyle = "SeaGreen";
            ctx2.moveTo(triangle[index].points[0].x, triangle[index].points[0].y);
            for(var j = 1; j< triangle[index].numberPts; j++){
                ctx2.lineTo(triangle[index].points[j].x, triangle[index].points[j].y);
            }
            ctx2.closePath();
            ctx2.stroke();
            break;
        case 4:
            ctx2.strokeStyle = "YellowGreen";
            ctx2.moveTo(rect[index].points[0].x, rect[index].points[0].y);
            for(var j = 1; j< rect[index].numberPts; j++){
                ctx2.lineTo(rect[index].points[j].x, rect[index].points[j].y);
            }
            ctx2.closePath();
            ctx2.stroke();
            break;
        case 5:
            ctx2.strokeStyle = "Teal";
            ctx2.moveTo(polygon[index].points[0].x, polygon[index].points[0].y);
            for(var j = 1; j< polygon[index].numberPts; j++){
                ctx2.lineTo(polygon[index].points[j].x, polygon[index].points[j].y);
            }
            ctx2.closePath();
            ctx2.stroke();
            break;
        case 6:
            ctx2.strokeStyle = "SteelBlue";
            ctx2.moveTo(curve[index].points[0].x, curve[index].points[0].y);

            ctx2.quadraticCurveTo(curve[index].points[1].x, curve[index].points[1].y, curve[index].points[2].x, curve[index].points[2].y);
            ctx2.stroke();
            break;
        case 7:
            // var centerx = (ellipse[index].points[0].x + ellipse[index].points[1].x)/2;
            // var centery = (ellipse[index].points[0].y + ellipse[index].points[1].y)/2;
            // var radiusx = ellipse[index].points[1].x - centerx;
            // var radiusy = ellipse[index].points[1].y - centery;
            ctx2.strokeStyle = "RebeccaPurple";
            ctx2.ellipse(ellipse[index].centerX, ellipse[index].centerY, ellipse[index].radiusX, ellipse[index].radiusY, ellipse[index].rotation, 0, 2*Math.PI);
            ctx2.stroke();
            break;
        case 8:
            ctx2.strokeStyle = "SkyBlue";
            ctx2.moveTo(square[index].points[0].x, square[index].points[0].y);
            for(var j = 1; j< square[index].numberPts; j++){
                ctx2.lineTo(square[index].points[j].x, square[index].points[j].y);
            }
            ctx2.closePath();
            ctx2.stroke();
            break;
        case 9:
            ctx2.strokeStyle = "LightCoral";
            ctx2.moveTo(pentagon[index].points[0].x, pentagon[index].points[0].y);
            for(var j = 1; j< pentagon[index].numberPts; j++){
                ctx2.lineTo(pentagon[index].points[j].x, pentagon[index].points[j].y);
            }
            ctx2.closePath();
            ctx2.stroke();
            break;
    }
}

function reDrawHelper(){
      //gonna need exception for whatever we are transforming
        // if i != id redraw
    for (var i = 0; i < circle.length; i++){
        if(circle_selected == true && i == selectedId)
        {

        }
        else
            reDrawShapes(1,i);
    }
    for (var i = 0; i < line.length; i++){
        if(line_selected == true && i == selectedId)
        {

        }
        else
            reDrawShapes(2,i);
    }
    for (var i = 0; i < triangle.length; i++){
        if(triangle_selected == true && i == selectedId)
        {

        }
        else
            reDrawShapes(3,i);
    }
    for (var i = 0; i < rect.length; i++){
        if(rectangle_selected == true && i == selectedId)
        {

        }
        else
            reDrawShapes(4,i);
    }
    for (var i = 0; i < polygon.length; i++){
        if(poly_selected == true && i == selectedId)
        {

        }
        else
            reDrawShapes(5,i);
    }
    for (var i = 0; i < curve.length; i++){
        if(curve_selected == true && i == selectedId)
        {

        }
        else
            reDrawShapes(6,i);
    }
    for (var i = 0; i < ellipse.length; i++){
        if(ellipse_selected == true && i == selectedId)
        {

        }
        else
            reDrawShapes(7,i);
    }
    for (var i = 0; i < square.length; i++){
        if(square_selected == true && i == selectedId)
        {

        }
        else
            reDrawShapes(8,i);
    }
    for (var i = 0; i < pentagon.length; i++){
        if(pentagon_selected == true && i == selectedId)
        {

        }
        else
            reDrawShapes(9,i);
    }
}

function selector(){   

    var canvas = document.getElementById( "gl-canvas" );

        canvas.onmousedown = function(event){
            if(selectMode == true){
            var pos = getMousePos(canvas, event);

            if (canvas.getContext) {
                var ctx2 = canvas.getContext('2d');
            }

            
            for(var i = 0; i < rect.length; i++){
                ctx2.beginPath();
                ctx2.moveTo(rect[i].points[0].x, rect[i].points[0].y);
                for(var j = 1; j< rect[i].numberPts; j++){
                    ctx2.lineTo(rect[i].points[j].x, rect[i].points[j].y);
                }
                ctx2.closePath();
                if(ctx2.isPointInPath(pos.x, pos.y)){
                    rectangle_selected = true;
                    selectedType = 4;
                    selectedId = i;
                    line_selected = false;
                    circle_selected = false;
                    triangle_selected = false;
                    poly_selected = false;
                    curve_selected = false;
                    ellipse_selected = false;
                    square_selected = false;
                    pentagon_selected = false;

                    //selectMode = true;
                    break;
                }
                else {
                    rectangle_selected = false;


                }

            }

            for(var i = 0; i < line.length; i++){
                ctx2.beginPath();
                ctx2.lineWidth = 8;
                ctx2.moveTo(line[i].points[0].x, line[i].points[0].y);
                for(var j = 1; j< line[i].numberPts; j++){
                    ctx2.lineTo(line[i].points[j].x, line[i].points[j].y);
                }
                
                ctx2.closePath();
                if(ctx2.isPointInStroke(pos.x, pos.y)){
                    line_selected = true;
                    selectedType = 2;
                    selectedId = i;
                    rectangle_selected = false;
                    circle_selected = false;
                    triangle_selected = false;
                    poly_selected = false;
                    curve_selected = false;
                    ellipse_selected = false;
                    square_selected = false;
                    pentagon_selected = false;

                    //selectMode = true;
                    break;
                }
                else {
                    line_selected = false;
                }

            }

            for(var i = 0; i < circle.length; i++){
                ctx2.beginPath();
                
                var centerx = (circle[i].points[0].x + circle[i].points[1].x)/2;
                var centery = (circle[i].points[0].y + circle[i].points[1].y)/2;
                var radius = Math.sqrt(Math.pow((centerx - circle[i].points[0].x),2) + Math.pow((centery - circle[i].points[0].y), 2));
                ctx2.arc(centerx, centery, radius, 0, 2 * Math.PI);
        
                //ctx2.closePath();
                if(ctx2.isPointInPath(pos.x, pos.y)){
                    circle_selected = true;
                    selectedType = 1;
                    selectedId = i;
                    rectangle_selected = false;
                    triangle_selected = false;
                    poly_selected = false;
                    curve_selected = false;
                    line_selected = false;
                    ellipse_selected = false;
                    square_selected = false;
                    pentagon_selected = false;

                    //selectMode = true;
                    break;
                }
                else {
                    circle_selected = false;
                }

            }

            for(var i = 0; i < triangle.length; i++){

                ctx2.beginPath();
                ctx2.moveTo(triangle[i].points[0].x, triangle[i].points[0].y);
                for(var j = 1; j< triangle[i].numberPts; j++){
                    ctx2.lineTo(triangle[i].points[j].x, triangle[i].points[j].y);
                }
        
                //ctx2.closePath();
                if(ctx2.isPointInPath(pos.x, pos.y)){
                    triangle_selected = true;
                    selectedType = 3;
                    selectedId = i;
                    rectangle_selected = false;
                    circle_selected = false;
                    poly_selected = false;
                    curve_selected = false;
                    line_selected = false;
                    ellipse_selected = false;
                    square_selected = false;
                    pentagon_selected = false;

                    //selectMode = true;
                    break;
                }
                else {
                    triangle_selected = false;
                }

            }

            for(var i = 0; i < polygon.length; i++){

                ctx2.beginPath();
                ctx2.moveTo(polygon[i].points[0].x, polygon[i].points[0].y);
                for(var j = 1; j< polygon[i].numberPts; j++){
                    ctx2.lineTo(polygon[i].points[j].x, polygon[i].points[j].y);
                }
        
                ctx2.closePath();
                if(ctx2.isPointInPath(pos.x, pos.y)){
                    poly_selected = true;
                    selectedType = 5;
                    selectedId = i;
                    rectangle_selected = false;
                    circle_selected = false;
                    triangle_selected = false;
                    curve_selected = false;
                    line_selected = false;
                    ellipse_selected = false;
                    square_selected = false;
                    pentagon_selected = false;

                    //selectMode = true;
                    break;
                }
                else {
                    poly_selected = false;
                }

            }

            for(var i = 0; i < curve.length; i++){

                ctx2.beginPath();
                ctx2.moveTo(curve[i].points[0].x, curve[i].points[0].y);
                ctx2.quadraticCurveTo(curve[i].points[1].x, curve[i].points[1].y, curve[i].points[2].x, curve[i].points[2].y);
        
                //ctx2.closePath();
                if(ctx2.isPointInPath(pos.x, pos.y)){
                    curve_selected = true;
                    selectedType = 6;
                    selectedId = i;
                    rectangle_selected = false;
                    circle_selected = false;
                    triangle_selected = false;
                    poly_selected = false;
                    line_selected = false;
                    ellipse_selected = false;
                    square_selected = false;
                    pentagon_selected = false;

                    //selectMode = true;
                    break;
                }
                else {
                    curve_selected = false;
                }

            }

            for(var i = 0; i < ellipse.length; i++){

                ctx2.beginPath();
                var centerx = (ellipse[i].points[0].x + ellipse[i].points[1].x)/2;
                var centery = (ellipse[i].points[0].y + ellipse[i].points[1].y)/2;
                var radiusx = Math.abs(ellipse[i].points[1].x - centerx);
                var radiusy = Math.abs(ellipse[i].points[1].y - centery);
                ctx2.ellipse(centerx, centery, radiusx, radiusy, ellipse[i].rotation, 0, 2*Math.PI);
        
                //ctx2.closePath();
                if(ctx2.isPointInPath(pos.x, pos.y)){
                    ellipse_selected = true;
                    curve_selected = false;
                    selectedType = 7;
                    selectedId = i;
                    rectangle_selected = false;
                    circle_selected = false;
                    triangle_selected = false;
                    poly_selected = false;
                    line_selected = false;
                    square_selected = false;
                    pentagon_selected = false;

                    //selectMode = true;
                    break;
                }
                else {
                    ellipse_selected = false;
                }

            }

            for(var i = 0; i < square.length; i++){

                ctx2.beginPath();
                ctx2.moveTo(square[i].points[0].x, square[i].points[0].y);
                for(var j = 1; j< square[i].numberPts; j++){
                    ctx2.lineTo(square[i].points[j].x, square[i].points[j].y);
                }
        
                //ctx2.closePath();
                if(ctx2.isPointInPath(pos.x, pos.y)){
                    square_selected = true;
                    selectedType = 8;
                    selectedId = i;
                    rectangle_selected = false;
                    circle_selected = false;
                    poly_selected = false;
                    curve_selected = false;
                    line_selected = false;
                    ellipse_selected = false;
                    triangle_selected = false;
                    pentagon_selected = false;

                    //selectMode = true;
                    break;
                }
                else {
                    square_selected = false;
                }

            }

            for(var i = 0; i < pentagon.length; i++){
                ctx2.beginPath();
                ctx2.moveTo(pentagon[i].points[0].x, pentagon[i].points[0].y);
                for(var j = 1; j< pentagon[i].numberPts; j++){
                    ctx2.lineTo(pentagon[i].points[j].x, pentagon[i].points[j].y);
                }
                ctx2.closePath();
                if(ctx2.isPointInPath(pos.x, pos.y)){
                    pentagon_selected = true
                    selectedType = 9;
                    selectedId = i;
                    line_selected = false;
                    circle_selected = false;
                    triangle_selected = false;
                    poly_selected = false;
                    curve_selected = false;
                    ellipse_selected = false;
                    square_selected = false;
                    rectangle_selected = false;


                    //selectMode = true;
                    break;
                }
                else {
                    pentagon_selected = false;


                }

            }
            
            
            var temp;

        }
    }
    

}
