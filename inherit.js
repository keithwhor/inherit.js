(function(){
	var $class, $super, $debug, $test;
    var __empty = function(){};
    var __debugEnabled = false;
    var __superCtx = null;
    var __initSuper__ = function(c) { __superCtx = c; };
    var __findError__ = function(e) {
        var orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function(_, stack){ return stack; };
        var a = Error.captureStackTrace(e, arguments.callee);
        Error.prepareStackTrace = orig;
        return e.stack[1].getLineNumber();
    };
    var $$classConstructor$$ = {
        'extends': function(cls) {
            delete this['extends'];
            this.prototype = Object.create(cls.prototype);
            Object.defineProperty(this.prototype, 'constructor', {value: this});
            Object.defineProperty(this.prototype, '__class__', {value: this});
            return this;
        },
        'var': function(prop, val) {
            delete this['extends'];
            var d = Object.getOwnPropertyDescriptor(this.prototype, prop);
            if(!!d && !d.writable) {
                throw new Error('$class ' + this.prototype.__class__.name +
                                '\nCannot write property ' + prop + ', it is already defined as a method.');
            }
            this.prototype[prop] = val;
            return this;
        },
        'def': function(prop, val) {
            delete this['extends'];
            if(typeof(val)!=='function') {
                throw new Error('$class ' + this.prototype.__class__.name +
                                '\nMethod ' + prop + ' must be a function.');
            }
            val['__parent__'] = this.prototype;
            val['__name__'] = prop;
            var d = {enumerable: false, configurable: false, writable: false};
            if(prop!=='__init__') { d.enumerable = true; }
            var strFn = val.toString();
            if(__debugEnabled) {
                if(strFn.indexOf('$super')>-1) {
                    d.value = function() {
                        try {
                            __initSuper__(this);
                            return val.apply(this,arguments);
                        } catch(e) {
                            var name = this.__class__?this.__class__:'UNKNOWN CLASS';
                            throw new Error('$class ' + name + ', method ' + prop + '() @ Line ' + __findError__(e) +
                                            '\n' + e);
                        }
                    };
                } else {
                    d.value = function() {
                        try {
                            return val.apply(this,arguments);
                        } catch(e) {
                            var name = this.__class__?this.__class__:'UNKNOWN CLASS';
                            throw new Error('$class ' + name + ', method ' + prop + '() @ Line ' + __findError__(e) +
                                            '\n' + e);
                        }
                    };
                }
            } else {
                if(strFn.indexOf('$super')>-1) {
                    d.value = function() { __initSuper__(this); return val.apply(this,arguments); };
                } else {
                    d.value = val;
                }
            }
            Object.defineProperty(this.prototype, prop, d);
            return this;
        }
    };
    $super = function() {
        var a = arguments.callee.caller;
        if(a && a['__parent__']) {
            var fn = a['__parent__'].__proto__[a['__name__']];
            if(typeof(fn)=='function') {
                return fn.apply(__superCtx,arguments);
            }
        }
        return null;
    };
    $class = function($){
        if(!$ || typeof($)!='string') { throw new Error('Class must have a string name and be of non-zero length'); }
        if(!$ || typeof(__empty[$])!='undefined') { throw new Error('Invalid class name: ' + $); }
        if(typeof($class[$])=='function') { return $class[$]; }
        if($.match(/[^0-9A-Za-z_\$]+/gi)!==null) { throw new Error('Invalid character in class name: ' + $); }
        var f = new Function('return function ' + $ + '(){if(typeof(this.__init__)==\'function\'){this.__init__(arguments);}};')();
        Object.defineProperty(f.prototype, 'constructor', {value: f});
        Object.defineProperty(f.prototype, '__class__', {value: f});
        for(var k in $$classConstructor$$) { f[k] = $$classConstructor$$[k]; }
        Object.defineProperty(f, 'descriptor', {value: $, enumerable: true, configurable: true});
        Object.defineProperty(f, 'class$', {
            get: function() {
                var name = this['descriptor'];
                if(!name) { throw new Error('Class not initialized properly'); }
                for(var k in this) { delete this[k]; }
                Object.defineProperty($class, name, {value: this});
                return true;
            },
            enumerable: true,
            configurable: true
        });
        return f;
    };
    $debug = function() { __debugEnabled = true; };
    $test = function(fn,name,num) {
        name = !name?fn.name:name;
        console.log('Testing ' + name + '...');
        var c = num|0;
        c = c>0?c:1000000;
        var t = 0;
        var s = (new Date).valueOf();
        for(var i=0;i<c;i++) { fn(); }
        var t = (new Date).valueOf()-s;
        var rate = c/t;
        var overhead = t/c;
        var pers = Math.round(rate*1000).toString();
        var len = pers.length;
        for(var i=len-3;i>0;i-=3) {
            pers = pers.substring(0,i) + ',' + pers.substring(i);
        }
        console.log('Ran ' + name + ' at a rate of ' + pers + ' ops per second.');
        console.log('Average run time was ' + Math.round(overhead*1000000) + ' nanoseconds');
    };
	window['$class'] = $class;
	window['$debug'] = $debug;
	window['$super'] = $super;
	window['$test'] = $test;
})();