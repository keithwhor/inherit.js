inherit.js
==========

A more elegant way to prototype.

inherit.js is a lightweight (3kb) wrapper for prototyping in js.

It combines function chaining with Python-inspired syntax
to make object orientation in Javascript more manageable and easier to read.

Compatibility
-------------

inherit.js is supported by all current versions of major browsers.

Installation
------------

inherit.js is currently only supported client-side, but expect node support soon. :)

Download inherit.min.js and include it on any page using

```html
<script src="path_to_my_scripts/inherit.min.js"></script>
```

before you start using inherit-js code, and you're good to go!

Usage
-----

Using inherit.js is easy.

```javascript
$class('myClass')
  
  .var('myVar', 100)
  
  .def(
    'myMethod',
    function(x) {
      return this.myVar++;
    }
  )
    
.class$;
```

This will create a class ```$class.myClass``` with prototyped variable ```myVar``` and prototype method ```myMethod```.

__NOTE__: ```.class$;``` might look like syntactic sugar, but actually has functional significance. Do not forget it!

__All objects (classes) created this way will be stored in the global $class variable.__

```javascript
var test = new $class.myClass(); // brackets are not necessary if we have no initialization variables
console.log(test.myVar); // will print :: 100
test.myMethod(); // increment test.myVar, return result;
console.log(test.myMethod()); // will print :: 101
console.log(test.myVar); // myVar was incremented after it was returned, will print :: 102

var test2 = new $class.myClass();
console.log(test2.myVar); // new instance, will print :: 100
```

Was it prototyped correctly? The ```instanceof``` operator will tell us...

```javascript
console.log(test instanceof $class.myClass); // will print :: true
```

Initialization
--------------

inherit.js supports an ```__init__``` magic method, which can take any number of arguments

```javascript
$class('clsInit')

  .var('x', 0)
  .var('y', 0)
  
  .def(
    '__init__',
    function(x, y) {
      // x|0, y|0 not typos - force x, y to 32-bit signed ints by bitwise OR with 0.
      this.x = x|0;
      this.y = y|0;
    }
  )
  
.class$;
```

When we instantiate ```$class.clsInit```, we can now provide two arguments and have the newly created object's ```x``` and ```y``` values set.

```javascript
var obj = new $class.clsInit(37,69);
console.log([obj.x, obj.y]); // will print :: [37, 69]
```

Inheritance
-----------

inherit.js also provides an easy way to inherit from other inherit.js objects using the ```.extends()``` function.

```javascript
$class('clsExtension')
  .extends($class.clsInit)
  
  .def(
    '__init__',
    function(a) {
      console.log('Extension initialized.');
      $super(99,99);
    }
  )
  
.class$;
```

You'll notice we have a ```$super()``` call in the ```__init__``` method.
```$super()``` will automatically reference the parent method of the same name if it exists, otherwise it will return null.
If a parent object does not have a method of the same name, ```$super()``` will continue up the prototype tree to find the next method that has one, if it exists.

__NOTE__: If you do not make a call to ```$super()```, child methods will override parent methods completely.

```javascript
var obj2 = new $class.clsExtension(); // will print :: 'Extension initialized.'
console.log([obj2.x, obj2.y]); // will print :: [99, 99]
```

And what about ```instanceof```?

```javascript
// will print :: true
console.log(obj2 instanceof $class.clsExtension);

// will also print :: true
console.log(obj2 instanceof $class.clsInit);
// Hooray!
```

Debugging
---------

You'll notice that you'll come across very hard-to-trace bugs when defining methods with inherit.js.

Don't worry!

Just call:
```javascript
$debug();
```

Before defining your classes, and if you come across errors the class and method will be pointed out for you. :)

Performance testing
-------------------

inherit.js comes with a built in performance-testing function.

As inherit.js is largely a prototyping wrapper, there *should* be no decrease in performance associated with
the code you write, with the exception of methods that use ```$super()``` - expect them to take a few more nanoseconds. ;)
(Test it yourself!)

```javascript
var iteration_count = 1000000; // Let's test a million times...
$test(function() { /* code to test */ }, 'My Test Name', iteration_count);
```

This will output a nice little log in your console telling you performance statistics - operations per second, and time per operation in nanoseconds.

That's it!
----------

You're all ready to use inherit.js. Go nuts! :)

Feel free to contact me at keithwhor at gmail.com

    
