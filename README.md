# try.js

**try.js** is a small plugin that you can include in your projects and libraries. It tries to resolve issues with current way of handling errors in JavaScript. Currently, errors are handled using `try...catch` statement, but there are some problems:

### Problem 1: Do something if no error is thrown
 In plain JavaScript, if you want to do something if no error is thrown, there is no success statement for it. You can do it the following way:
```js
try {
    foo() // error may be thrown here
    console.log('success') // if no error is thrown, this line executes
} catch (error) {
    console.log('error')
}
```
With **try.js**, the above example becomes:
```js
$.try(() => { foo() })
.catch(() => { console.log('error') })
.success(() => { console.log('success') })
```
Better readability, without comments. Plus, the ordering of `.catch` and `.success` is arbitrary.
### Problem 2: Nested error handling
 Real advantage of using **try.js** can be seen in this example. Let's say that the algorithm is:

1. **See if `foo()` throws error**
2. if throws, write `'foo error'` on the console.
3. if does not throw, write `'foo success'` on the console and **see if `bar()` throws error**
4. if throws, write '`bar error'` on the console.
5. if does not throw, write `'bar success'` on the console.

With plain javascript, 

```js
try { 
	foo() 
	console.log('foo success')
	try { 
		bar() 
		console.log('bar success')
	} 
	catch (error) {
	    console.log('bar error')
	}
} catch (error) {
    console.log('foo error')
}
```
With **try.js**, the above example becomes:
```js
$.try(() => { foo() })
.catch(() => { console.log('foo error') })
.success(() => {
	console.log('foo success')
    $.try(() => { bar() })
	.catch(() => { console.log('bar error') })
	.success(() => { console.log('bar success') })
})
```
Significantly less lines, more flexible ordering, better readability.

## Adding to other libraries
If `$` is defined, it automatically attaches itself to `$.try`, otherwise, a global variable named `$try` is created.


## License


Licensed under the MIT license.