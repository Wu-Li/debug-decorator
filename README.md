# debug-decorator
A Typescript decorator for printng the in inputs and outputs of functions

This decorator can be applied to a class to print the arguments and returns of every method within that class. 

You can also supply the decorator with an array of strings for methods in the class that you don't want it to log.
i.e.
@debug(['print','updateWidth'])
class MyClass {...}

Finally, you can apply the decorator directly to an individual function, whether it is a member of a class or not.

When applied to a class it will log th ename of the class and the method when logging the call and arguments, and just the name of the method when logging the return.
