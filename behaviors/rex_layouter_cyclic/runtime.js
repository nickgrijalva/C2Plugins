﻿// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.behaviors, "cr.behaviors not created");

/////////////////////////////////////
// Behavior class
cr.behaviors.Rex_layouter_cyclic = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	var behaviorProto = cr.behaviors.Rex_layouter_cyclic.prototype;
		
	/////////////////////////////////////
	// Behavior type class
	behaviorProto.Type = function(behavior, objtype)
	{
		this.behavior = behavior;
		this.objtype = objtype;
		this.runtime = behavior.runtime;
	};
	
	var behtypeProto = behaviorProto.Type.prototype;

	behtypeProto.onCreate = function()
	{     
	};
    
	/////////////////////////////////////
	// Behavior instance class
	behaviorProto.Instance = function(type, inst)
	{
		this.type = type;
		this.behavior = type.behavior;
		this.inst = inst;
		this.runtime = type.runtime;       
	};
	
	var behinstProto = behaviorProto.Instance.prototype;

	behinstProto.onCreate = function()
	{
	    this.check_name = "LAYOUTER";
	    this.start_angle = this.properties[0];
	    this.cyclic_angle = this.properties[1];
	};

	behinstProto.tick = function ()
	{
	};  

	behinstProto.on_add_insts = function (insts)
	{	
	    this._on_update();
	};

	behinstProto.on_remove_insts = function (insts)
	{
	    this._on_update();	    
	}; 

	behinstProto._on_update = function ()
	{
	    var layouter = this.inst;
	    var OX = layouter.get_centerX(layouter); 
	    var OY = layouter.get_centerY(layouter); 
	    var OA = cr.to_clamped_degrees(layouter.angle);
	    var sprites = layouter.sprites;
	    var i, cnt = sprites.length, params;
	    var a, r = Math.min(layouter.width, layouter.height)/2;
	    var start_angle = cr.to_clamped_radians(OA + this.start_angle);
	    var cyclic_angle = (Math.abs(this.cyclic_angle) == 360)? 
                           (2*Math.PI): cr.to_radians(this.cyclic_angle);
	    var is_anti_clockwise = (this.cyclic_angle < 0);
	    for (i=0;i<cnt;i++)
	    {
	        a = (cyclic_angle*i)/cnt;
	        if (is_anti_clockwise)
	            a = (-1)*a;
	        a += start_angle;
	        params = {x:OX + (r*Math.cos(a)),
	                  y:OY + (r*Math.sin(a)),
	                  angle:cr.to_degrees(a)}
	        layouter.layout_inst(sprites[i], params);
	    }	    
	}; 	 	
	//////////////////////////////////////
	// Conditions
	function Cnds() {};
	behaviorProto.cnds = new Cnds();
	
	//////////////////////////////////////
	// Actions
	function Acts() {};
	behaviorProto.acts = new Acts();
		
	//////////////////////////////////////
	// Expressions
	function Exps() {};
	behaviorProto.exps = new Exps();
	
}());