const { json } = require('express');

var express=require('express'),
    app=express();
    fs=require('fs');
    json_File=require("./data"); 

app.get("/",function(req,res){
    res.send("hello");
});

app.get("/height/:initial_height/coefficient_restitution/:restitution/details",function(req,res){
    var colist=[];
    var g=9.8;
    var h=parseFloat(req.params.initial_height);
    var e=parseFloat(req.params.restitution);
    if(h>=0.00001 && e!=0){
        var n=1;
    }
    else{
        var n=0;
    }
    var u=Math.sqrt(2*g*h);
    var s=h;
    var t=0;
    var colist_obj={"x":t.toFixed(6),"y":s.toFixed(6)};
    colist.push(colist_obj);
    s=0;
    t=(u/g);
    colist_obj={"x":t.toFixed(6),"y":s.toFixed(6)};
    colist.push(colist_obj);;
    while(h>=0.00001){
        n++;
        v=e*u;
        s=Math.pow(v,2)/(2*g);
        h=s;
        var t1=(v/g);
        t=t+t1;
        colist_obj={"x":t.toFixed(6),"y":s.toFixed(6)};
        colist.push(colist_obj);
        s=0;
        t=t+t1;;
        colist_obj={"x":t.toFixed(6),"y":s.toFixed(6)};
        colist.push(colist_obj);
        u=v;
    }
    var json_obj={"bounces":n,"co-ordinates": colist};

    json_File.history.push(json_obj); 
   
    fs.writeFile("data.json",JSON.stringify(json_File),function(err,data){ 
        if(err){
            throw err; 
        }  
    }); 
    res.json(json_obj);
});

app.get("/history",function(req,res){
    fs.readFile("data.json",'utf-8',function(err,data){ 
        if(err){
            throw err; 
        }  
        else{
           res.json(JSON.parse(data));
        }
    }); 
});

app.get("*",function(req,res){
    res.send("URL does not exist");
});

const PORT=5000;

app.listen(PORT,function(){
    console.log("hello");
});