# TypeScriptDesignPattern

## Factory method
When a class cannot predict exactly what objects it will create or its subclasses may want to create more specified version of these object, then the Factory Method Pattern can be applied!

![](photo/factoryMethod/factoryMethod.png)

## Abstract Factory
This pattern defines the interfaces of a collection of factory methods, **without specifying concrete products**. This allows an entire factory to be replaceable, inorder to produce different products following the same production outline.

The intention of this pattern is providing a interface creating a serial of objects related or which are depend on each other without specify their spefic class. It is the solution to the problem of selecting the interface. 

When the products of system is more than one and system only consume one of them.

![](photo/abstractFactory.png)

The details of the products are omitted from the diagram. These products belong to ExperimentalRocket and FreightRocket.

Abstract Factory Pattern makes the abstraction on top of different concrete factories. At the scope of a single factory or a single branch of factories, it just works like the Factory Method Pattern. However, the highlight of this pattern is to make a whole family of products interchangeable. 