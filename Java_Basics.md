# Java Basics

- Source files end with `.java`, and compiled bytecode files end with `.class` extension.
- The first `public class` name should match the filename. JVM looks for a `main` method as an entry point.
- Each class has its own `.class` file.
- Variable declaration: `int a;`
- Variable definition: `a = 27;`
- Static methods work only with static variables.
- Variables declared at the class level have default values (e.g., `int` defaults to `0`).
- Variable names can start with `$`, `_`, or alphabetic characters (avoiding spaces and numbers). Java keywords cannot be used as variable names.

## Primitive Data Types

### Integer Types
- `byte aSingleByte = 100;` (-128 to 127)
- `short aSmallNumber = 20000;` (-32,768 to 32,767)
- `int anInteger = 2147483647;` (-2147483648 to 2147483647)
- `long aLargeNumber = 9223372036854775807L;` (-9223372036854775808 to 9223372036854775807)

### Decimal Types
- `double aDouble = 1.79769313;` (large range, default for decimals)
- `float aFloat = 3.4020F;`

### Other Types
- `boolean isWeekend = false;`
- `char copyrightSymbol = '%';`

- Smaller data types can be implicitly converted to larger data types, but not vice versa.
- Explicit typecasting is required to convert from larger to smaller data types, potentially losing data.

## Operators

- Arithmetic: `+`, `-`, `*`, `%`, `/`
- Assignment
- Shorthand
- Relational: `>`, `<`, `==`, `!=`, `>=`, `<=`
- Logical: `&&`, `||`, `!`, `++`, `--`
- Bitwise

- The `new` keyword creates objects in the heap.

# Strings in Java

- Strings in Java are objects, not primitive types.
- Strings stored in the string pool may reuse existing values if they already exist.
- Using `new String()` creates a new variable regardless of existing values in the string pool.

## Demonstration Example

```java
class StringDemo {
    public static void main(String args[]) {
        String literalString1 = "abc";
        String literalString2 = "abc";

        String objectString1 = new String("xyz");
        String objectString2 = new String("xyz");

        System.out.println(literalString1 == literalString2); // Output: true becuase the value "abc" already exist in the string pool so we are resuing that value and pointing the literalString2 tp the literalString1 location.. if we cahange the value of the literalString2 then it will point to the new location but it will not change the value of the literalString1
        System.out.println(objectString1 == objectString2); // Output: false  because both objects are diff i.e. they wil have the diff addressess
    }
}
```
# String Functions in Java

```java
String name = "sujith";
int age = 23;

String formattedString = String.format("My name is %s .. and my age is %d", name, age);
System.out.println(formattedString);
// %d for integer, %s for String, %b for boolean, %c for char, %f for float

name.length();
name.isEmpty();
name.toUpperCase();
name.toLowerCase();

String string1 = new String("abc");
String string2 = new String("abc");

string1.equals(string2); // true
string1 == string2; // false (explained above)

String sentence = "the sky is blue";
System.out.println(sentence.replace("blue", "red")); // Prints replaced string
String updatedSentence = sentence.replace("blue", "red");

sentence.contains("sky"); // Checks if "sky" is present
name.substring(0, 3); // Substring from 0 to 2
name.substring(1); // From 1 to end of the string
name.indexOf('u');
name.indexOf("ujit");
sentence.indexOf("sky", 1); // Index of "sky" from position 1
name.charAt(i);

String lineOfCurrencies = "USD JPY AUD SGD HKD CAD CHF GBP EURO INR"; 
String[] currencies = lineOfCurrencies.split(" ");
System.out.println("output string: " + Arrays.toString(currencies));

// String methods do not have a Reverse() method due to String objects being immutable.
```

# User Inputs in Java

```java
import java.util.Scanner;

Scanner sc = new Scanner(System.in);
String userName = sc.nextLine();
int userAge = sc.nextInt();
sc.nextLine(); // Clean the input buffer
String userLanguage = sc.nextLine();

// Close the object after opening it
sc.close();

System.out.printf("Name: %s, Age: %d, Language: %s", userName, userAge, userLanguage);

//Method 1: Using Scanner

Scanner sc = new Scanner(System.in);
System.out.println(sc.nextInt());


//Method 2: Using BufferedReader

import java.io.BufferedReader;
import java.io.InputStreamReader;

InputStreamReader in = new InputStreamReader(System.in);
BufferedReader bf = new BufferedReader(in);
int value = Integer.parseInt(bf.readLine());

```

# Converting Types and Working with Arrays

## Converting String to int, double

```java
String value = "101";
String val2 = "10.21";

System.out.println(Integer.parseInt(value));
System.out.println(Double.parseDouble(val2));

if (operation.equals("sum")) {
    System.out.printf("%f - %f = %f ", val1, val2, val1 - val2);
}

// Switch case example
switch (val) {
    case "Sum":
        System.out.println("add");
        break;
    case "Sub":
        System.out.println("sub");
        break;
    default:
        System.out.println("no no");
}
```

## Arrays

```java
char vowels[] = new char[5];

vowels[0] = 'a';
vowels[1] = 'e';
vowels[2] = 'i';
vowels[3] = 'o';
vowels[4] = 'u';

// or

char vowels[] = {'a', 'e', 'i', 'o', 'u'};

java.util.Arrays;
System.out.println(Arrays.toString(vowels)); // Output: [a, e, i, o, u]

vowels.length;
Arrays.sort(vowels);
System.out.println(Arrays.toString(vowels));

Arrays.sort(vowels, 1, 4);
System.out.println(Arrays.toString(vowels));

Arrays.binarySearch(vowels, 'o');
Arrays.binarySearch(vowels, 1, 4, 'o');

Arrays.fill(vowels, 'X');
Arrays.fill(vowels, 1, 4, 'X');

int numbers[] = {1, 2, 3, 4, 5};
int copyOfNumbers[] = Arrays.copyOf(numbers, numbers.length);
Arrays.fill(numbers, 0);

System.out.println(Arrays.toString(numbers)); // [0, 0, 0, 0, 0]
System.out.println(Arrays.toString(copyOfNumbers)); // [1, 2, 3, 4, 5]

int copyOfNumbers = Arrays.copyOf(numbers, 2);
int copyOfNumbers = Arrays.copyOfRange(numbers, 2, 5);

Arrays.equals(numbers, copyOfNumbers);

for (int number : numbers) {
    System.out.printf("%d is the number", number);
}

for (int i = 0; i < numbers.length; i++) {
    System.out.println(numbers[i]);
}
```

## Static Elements in Java
### Static Variables, Methods, Blocks, and Nested Classes

```java

// Static Variables
class MyClass {
    static int count = 0;

    public MyClass() {
        count++; // Each instance increases count
    }
}

// Static Methods
class Utility {
    static int add(int a, int b) {
        return a + b;
    }
}

// Static Blocks
class MyClass {
    static {
        System.out.println("Static block initialized.");
    }
}

// Static Nested Classes
class Outer {
    static int outerVar = 10;

    static class StaticNested {
        void display() {
            System.out.println("Outer variable: " + outerVar);
        }
    }
}
```

# Encapsulation in Java

Encapsulation in Java refers to bundling data (variables) and methods (functions) within a single unit, typically a class. It involves restricting access to certain components of an object and exposing only what is necessary. Key features include:

1. **Access control:** Encapsulation helps control the accessibility of class members, defining the level of access for each variable or method.

2. **Data Hiding:** Encapsulation hides the internal state of objects from the outside. It ensures that implementation details are hidden and accessed through well-defined interfaces (public methods).

```java
class Human {
    private String name;
    private int age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}

public class EncapsulationDemo {
    public static void main(String[] args) {
        Human man = new Human();
        man.setAge(30);
        man.setName("Sujith");

        System.out.printf("Name is %s and his age is %d", man.getName(), man.getAge());
    }
}
```

# Abstraction in Java

Abstraction in Java involves hiding complex implementation details while exposing only necessary functionalities or behavior of an object. Key features include:

1. **Hiding Complex Implementation:** Abstraction allows focusing on essential attributes and behaviors while hiding irrelevant complexities.

2. **Creating a Model:** It defines a blueprint or model for objects, encompassing only necessary attributes and behaviors while abstracting away unnecessary details.

## Implementation:

### Abstract Class:
Abstract classes cannot be instantiated on their own. They may contain abstract methods (without implementation) and concrete methods. Other classes extend abstract classes and provide implementations for abstract methods.

```java
abstract class Shape {
    // Abstract method (no implementation)
    public abstract void draw();

    // Concrete method
    public void display() {
        System.out.println("Displaying shape...");
    }
}

class Circle extends Shape {
    // Implementation of abstract method
    public void draw() {
        System.out.println("Drawing circle...");
    }
}

class Rectangle extends Shape {
    // Implementation of abstract method
    public void draw() {
        System.out.println("Drawing rectangle...");
    }
}
```

### Interfaces:
Interfaces declare abstract methods implemented by classes that implement the interface, achieving full abstraction.

```java

interface Animal {
    void makeSound();
}

class Dog implements Animal {
    public void makeSound() {
        System.out.println("Woof!");
    }
}

class Cat implements Animal {
    public void makeSound() {
        System.out.println("Meow!");
    }
}



interface MyInterface {
    // Method signatures (no implementation)
    void doSomething();
    int calculate(int x, int y);

    // Constants (implicitly static and final)
    String VERSION = "1.0";
}

Example-2:

interface MyInterface {
    static void myStaticMethod() {
        // Static method implementation
    }
}


```

# Constructors in Java

Constructors are special methods used to initialize objects of a class. They initialize objects upon creation and don’t have a return type, not even void. Key points include:

1. **Initialization:** Constructors initialize newly created objects, setting up the object's state and performing necessary setup tasks.

2. **Default Constructor:** Java provides a default constructor if none is explicitly defined in the class. It initializes member variables to their default values.

3. **Overloading Constructors:** Constructors can be overloaded by having different parameters, enabling multiple constructors with different parameter lists.

## Types of Constructors:

### Default Constructor:
```java
class MyClass {
    public MyClass() {
        // Initialization code
    }
}
```

### Parameterized Constructor:
```java

class Person {
    String name;
    int age;

    public Person(String n, int a) {
        name = n;
        age = a;
    }
}
```

### Constructor Chaining:
Java allows one constructor to call another in the same class using this(), known as constructor chaining.

```java
class Example {
    int value;

    public Example() {
        this(10); // Calls the parameterized constructor
    }

    public Example(int v) {
        value = v;
    }
}

```

Main uses of constructors include object initialization, setting default values for instance variables, and constructor overloading. Constructors aren't inherited by subclasses and can't be called directly.

# Inheritance in Java

Inheritance in Java enables classes to inherit properties and behavior from other classes. Key types of inheritance include:

1. **Single Inheritance:** A subclass inherits from a single superclass. Java supports single inheritance.
   
2. **Multilevel Inheritance:** A subclass extends another subclass, creating a hierarchy. Java supports multilevel inheritance.

3. **Multiple Inheritance:** Not directly supported in Java due to the diamond problem or ambiguity issue. It arises when a class inherits from two classes with a common ancestor. Java avoids multiple inheritance with classes but permits multiple inheritance through interfaces. Interfaces in Java help solve the ambiguity problem and support multiple inheritance.

Java allows a class to implement multiple interfaces, ensuring that a class can inherit the behaviors defined in multiple interfaces without the conflict issues found in multiple class inheritance.


# Polymorphism in Java

Polymorphism in Java refers to the ability of objects of different classes to be treated as objects of a common parent class.

## Types of Polymorphism:

### **Compile-time Polymorphism (Method Overloading):**

   Method overloading occurs when a class has multiple methods with the same name but different parameters.
   The method to call is determined at compile-time based on the number and types of arguments passed.

   ```java
   class Calculator {
       int add(int a, int b) {
           return a + b;
       }

       int add(){
           return 0;
       }

       double add(double a, double b) {
           return a + b;
       }
   }
```

### **Runtime Polymorphism (Method Overriding) (Dynamic binding): **

Method overriding occurs when a subclass provides a specific implementation of a method already defined in its superclass.
The method to call is determined at runtime based on the actual object instance.

```java
class Animal {
    void makeSound() {
        System.out.println("Some sound...");
    }
}

class Dog extends Animal {
    void makeSound() {
        System.out.println("Woof!");
    }
}

```

### **Polymorphism via Inheritance:**

Subclasses can be treated as instances of their superclass.
A reference variable of a superclass can hold an object of its subclass.

#### Example-1:
```java
Animal myAnimal = new Dog(); // Dog object treated as an Animal
myAnimal.makeSound(); // Calls Dog's makeSound() method

```

#### Example-2:

```java
interface Shape {
    void draw();
}

class Circle implements Shape {
    public void draw() {
        System.out.println("Drawing Circle");
    }
}

class Rectangle implements Shape {
    public void draw() {
        System.out.println("Drawing Rectangle");
    }
}

// Treating different shapes uniformly via the Shape interface
Shape circle = new Circle(); // dynamic binding
Shape rectangle = new Rectangle();

circle.draw(); // Draws a Circle
rectangle.draw(); // Draws a Rectangle

```
Polymorphism offers benefits such as code reusability, flexibility, and ease of maintaining code.


# Access Modifiers

Access modifiers in Java are keywords used to define the accessibility or visibility of classes, variables, methods, and constructors in different scopes within Java programs. They control the level of access that other classes or components have to the elements in a Java application.

### Types of Access Modifiers:

1. **public:**
   - The most open access level.
   - Public elements are accessible from any other class or package.

2. **protected:**
   - Accessible within the same package or by subclasses.
   - Inherited members can be accessed by subclasses, even if they are in different packages.

3. **default (no modifier):**
   - Also known as package-private or package-local.
   - Accessible within the same package.
   - When no access modifier is specified, the default access level is applied.

4. **private:**
   - Most restrictive access level.
   - Accessible only within the same class.

### Details:

- **Classes:** A top-level class can only be declared as public or have default (no modifier) access. Inner classes can have any access modifier.
  
- **Variables and Methods:** Access modifiers can restrict access based on the enclosing class or package.

- **Inheritance:** Access modifiers play a role in method overriding; a subclass method cannot have more restrictive access than the superclass method it overrides.

# Final keyword in Java:

In Java, the `final` keyword is used to restrict the modification of classes, methods, and variables. It implies that once defined, the entity marked as `final` cannot be altered or overridden.

### **Final Classes:**
   - A final class cannot be subclassed/extended.
   - It prevents other classes from inheriting from it.
   
   ```java
   final class FinalClass {
       // Class definition
   }
    ```

### **Final Methods:**
- A final method cannot be overridden by subclasses.
- It ensures that the method implementation remains unchanged in all subclasses.

```java
class Parent {
    final void finalMethod() {
        // Method implementation
    }
}

class Child extends Parent {
    // Cannot override finalMethod from Parent
    // Attempting to override will result in a compilation error
}
```

### **Final Variables (Constants):**
- A final variable can be assigned a value only once.
- It behaves as a constant once initialized and cannot be reassigned.

```java
class MyClass {
    final int CONSTANT_VALUE = 10;
    // CONSTANT_VALUE cannot be reassigned
}

```

# Abstract in Java

Abstract methods can only be defined in an abstract class, and an abstract class cannot be instantiated directly. To instantiate it, extend and implement the abstract methods as shown in the example below. This abstraction allows imposing rules and standards.

Abstract classes can have both concrete and abstract methods. An abstract class may or may not have abstract methods, but an abstract method should be in an abstract class. Making a class abstract will make it ineligible for instantiation.

```java
abstract class Vehicle {
    public abstract void seatingCapacity(); // Declaration, not the definition.

    public void engine(){
        System.out.println("4 - engine Ultra power electric engine");
    }
}

class Toyota extends Vehicle {
    public void seatingCapacity(){
        System.out.println("Toyota implemented with its seating capacity");
    }
}

public class AbstractDemo {
    public static void main(String[] args) {
        Vehicle obj = new Toyota();
        obj.seatingCapacity();
    }
}
```

# Anonymous Class in Java

The first program can also be written in another way using an anonymous class:

The second program utilizes an anonymous class directly within the main method to define an implementation for the abstract method display() without explicitly creating a subclass. This method can be useful for quick implementations of interfaces or abstract classes.

#### Program 1:

```java
abstract class AB {
    abstract void display();
}

class SubClass extends AB {
    void display() {
        System.out.println("I am in display");
    }
}

public class AnonymousClassDemo {
    public static void main(String[] args) {
        AB obj = new SubClass();
        obj.display(); // Output: I am in display
    }
}
```
#### Program 2:

```java
abstract class AB {
    abstract void display();
}

public class AnonymousClassDemo {
    public static void main(String[] args) {
        AB obj = new AB() {   // Anonymous class
            void display() {
                System.out.println("I am in display");
            }
        };
        obj.display();
    }
}

```

# Interface in Java

When an abstract class contains only abstract methods (method declarations without any method implementations), it often makes more sense to define an interface instead. Here's why:

#### Interface Methods:

1. All methods in an interface are by default public and abstract. They lack method bodies, meaning they're declared but not implemented.
2. Classes that implement the interface must provide concrete implementations for all methods declared in the interface.

#### Interface Variables:

1. All variables in an interface are by default public, static, and final. They're constants and cannot be changed by implementing classes.

Example:

```java
interface Rules {
    void eat();
    void sleep();
}

abstract class One implements Rules {
    void run() {
        System.out.println("I can run");
    }
}

class Two extends One {
    public void eat() {
        System.out.println("I can eat");
    }

    public void sleep() {
        System.out.println("I can sleep");
    }
}

public class InterfaceDemo {
    public static void main(String[] args) {
        One a = new Two();
        a.run();
        a.sleep();
    }
}
```

#### Example-1:
```java
interface MyInterface {
    // Method signatures (no implementation)
    void doSomething();
    int calculate(int x, int y);

    // Constants (implicitly static and final)
    String VERSION = "1.0";
}
```
### Example-2:
```java
interface MyInterface {
    static void myStaticMethod() {
        // Static method implementation
    }
}
```

# Enum in Java
In Java, an enum is a class, so the elements inside the enum that we define are objects.

The first example demonstrates a basic enum where elements are defined directly. The second example shows an enum where each element is associated with marks, and it overrides the toString() method to display element names along with their marks.

#### Example 1:

```java
enum Student {
    Sujith, Amith, Chandu, Abhi;

    @Override
    public String toString() {
        return super.toString();
    }
}

public class EnumDemo {
    public static void main(String[] args) {
        for (Student stu : Student.values()) {
            System.out.println(stu);
        }
    }
}

```

#### Example 2:

```java
enum Student {
    Sujith(90), Amith(30), Chandu(70), Abhi(90);

    private int marks;

    Student(int marks) {
        this.marks = marks;
    }

    public int getMarks() {
        return marks;
    }

    @Override
    public String toString() {
        return super.toString() + " - Marks: " + marks;
    }
}

public class EnumDemo {
    public static void main(String[] args) {
        for (Student stu : Student.values()) {
            System.out.println(stu);
        }
    }
}

```
# Types of Interfaces in Java

1. normal interface - more than 1 abstract method
2. Functional interface - with only one abstract method.
3. marker interface - no abstract methods - used to give permissions some of the marker interfaces are Serializable..etc


Marker interfaces in Java are interfaces that don't declare any methods but serve as markers to indicate a certain capability or behavior of a class that implements them. Some common marker interfaces in Java include:

Serializable: java.io.Serializable - Indicates that instances of implementing classes can be serialized.


## Functional interface

A Functional interface is a fundamental concept in Java, especially in the context of lambda expressions and functional programming paradigms. By definition, a functional interface contains only one abstract method, and it's marked as such using the @FunctionalInterface annotation, though the annotation itself is optional.

```java
// Functional Interface
interface MyInterface {
    void myMethod();
}

```

# Lambda Expressions

lambda expressions are closely associated with functional interfaces. A functional interface is an interface that contains only a single abstract method. Lambda expressions provide a concise way to implement the abstract method of a functional interface.

Lambda expressions can be used whenever the target type is a functional interface, meaning an interface with a single abstract method. This allows the lambda expression to provide the implementation of that single method without explicitly creating a class.

```java
// Functional Interface 
//------Example 1-------------------
interface MyInterface {
    void myMethod();
}

public class LambdaExample {
    public static void main(String[] args) {
        // Lambda expression implementing MyInterface
        MyInterface obj = () -> System.out.println("Implementation of myMethod");

        // Calling the method using the lambda expression
        obj.myMethod();
    }
}

//------Example 2.1-------------------
@FunctionalInterface
interface Sample {
    void run();
}

public class LambdaExpressionDemo {
    public static void main(String[] args) {
        Sample hu = new Sample() {
            public void run() {
                System.out.println("I can run");
            }
        };

        hu.run();
    }
}

//------Example 2.2-------------------
@FunctionalInterface
interface Sample {
    void run();
}

public class LambdaExpressionDemo {
    public static void main(String[] args) {
        Sample hu = () -> { // using lambda expression from java8
            System.out.println("I can run");
        };

        hu.run();
    }
}

//------Example 3-------------------
@FunctionalInterface
interface calc {
    int add(int a, int b);
}

public class FunctionalInterfaceDemo2 {
    public static void main(String[] args) {
        calc obj = (i, j) -> i + j;

        System.out.println(obj.add(2, 5));
    }
}

```

# Exceptions and Errors

In summary:

- **Compile-time errors** occur during code compilation and are related to syntax and structure.
- **Runtime errors** happen while the program is running and cause unexpected behavior or program termination, like file not found, etc.
- **Logical errors** occur due to flawed logic or incorrect reasoning in the code, leading to incorrect outcomes or results.

Runtime errors cause Exceptions, so we do exception handling for Runtime errors.

### Example 1:

```java
public class ExceptionDemoOne {
    public static void main(String[] args) {
        int i = 2;
        int j = 0;

        int arr[] = {1, 2, 3};
        String str = null;

        try {
            int k = i / j;
            System.out.println(arr[5]);
            System.out.println(str.getClass());
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by 0 " + e);
        } catch (NullPointerException e) {
            System.out.println("Cannot be null " + e);
        } catch (IndexOutOfBoundsException e) {
            System.out.println("Index out of bounds " + e);
        } catch (Exception e) {
            System.out.println("Exception occurred " + e);
        }
    }
}
```

## Exception Hierarchy

- Object
  - Throwable
    - Error
      - AssertionError
      - OutOfMemoryError
      - StackOverflowError
      - InternalError
      - UnknownError
      - etc..
    - Exception
      - **Checked Exceptions:**
        - IOException
          - FileNotFoundException
          - EOFException
          - SocketException
          - Other IOExceptions
        - SQLException
          - SQLTimeoutException
          - SQLDataException
          - Other SQLExceptions
        - ParseException
        - ClassNotFoundException
        - IllegalAccessException
        - NoSuchFieldException
        - NoSuchMethodException
        - ReflectiveOperationException
        - InterruptedException
        - CloneNotSupportedException
        - InstantiationException
        - Other Checked Exceptions
          
      - **Unchecked Exceptions:**
        - RuntimeException
          - NullPointerException
          - IllegalArgumentException
          - IndexOutOfBoundsException
            - ArrayIndexOutOfBoundsException
            - StringIndexOutOfBoundsException
            - Other IndexOutOfBoundsExceptions
          - ArithmeticException
          - ClassCastException
          - UnsupportedOperationException
          - IllegalStateException
          - ConcurrentModificationException
          - TypeNotPresentException
          - SecurityException
          - NoSuchElementException
          - FormatterClosedException
          - IllegalFormatException
          - MissingResourceException
          - DateTimeException
          - Other RuntimeExceptions
        - AssertionError (In JDK 1.4+)
        - ExceptionInInitializerError
        - StackOverflowError
        - NoClassDefFoundError
        - SecurityException
        - UnsupportedOperationException
        - HeadlessException
        - Other Unchecked Exceptions

- Errors: Usually indicate serious issues in the system or environment and are not typically handled by the program.
- Checked Exceptions: Must be handled either by catching or declaring in the method signature. compiler will force us to handle them.
- Unchecked Exceptions: Don't require explicit handling, but it's good practice to handle them if possible.
- The throw keyword in Java allows you to manually throw exceptions based on specific conditions or user-defined scenarios within your code.

### Example 2:

```java
public class ExceptionDemoTwo {
    public static void main(String[] args) {
        int i=6;
        try{
        if(i>10)
            throw new SujithException("Cannot not be greater than 10"); 
        if(i>5 && i<10)
            throw new ArithmeticException("cannot be between 5 and 10");
        }
        catch(Exception e){
            System.out.println("Exception..! "+e);
        }
    }
}

class SujithException extends Exception{
    SujithException(String message){
        super(message);
    }
}
```

### Example 3:

```java
class B1{
    void calc2() throws Exception{
        int arr[]={1,2,3};
        try{
            System.out.println(arr[10]);
        }
        catch(Exception e){
            System.out.println("It is handled in B itself ");
        }
    }
}

class C {
    void calc() throws ArithmeticException{
        int i=0;
        int j=10/i;
        System.out.println(j);
    }
}

public class ExceptionDemoThree {
    public static void main(String[] args) {
        C obj = new C();
        B1 obj2=new B1();
        try{
            //obj.calc();
            obj2.calc2();
        }
        catch(ArithmeticException e){
            System.out.println("In parent Arithmetic exception..! "+ e);
        }
        catch(Exception e){
            System.out.println("In parent main exception "+e);
        }
        finally{
            sop("do some thing .. like resource closusre..etc");
        }

    }
}
```

In Java, when a method declares that it throws an exception (using throws Exception), it means the method can potentially throw an exception of that type or its subclasses. In the case of calc2() in class B1, it declares that it can potentially throw an Exception.

However, in the catch block inside calc2(), it catches the Exception itself. This means that when the ArrayIndexOutOfBoundsException occurs (which is a subclass of Exception), it's caught within calc2() and handled locally. Therefore, the method doesn't propagate that specific exception further.

# Collections

## Collections Hierarchy

- [I] Collection
    - [I] List
        - [C] ArrayList
        - [C] LinkedList
        - [C] Vector
            - [C] Stack
        - [C] CopyOnWriteArrayList
    - [I] Queue
        - [C] PriorityQueue
        - [C] LinkedList
        - [C] ArrayBlockingQueue
        - [C] ConcurrentLinkedQueue
        - [C] DelayQueue
        - [C] LinkedBlockingQueue
        - [C] PriorityBlockingQueue
        - [C] SynchronousQueue
    - [I] Deque
        - [C] ArrayDeque
        - [C] LinkedBlockingDeque
    - [I] Set
        - [C] HashSet
            - [C] LinkedHashSet
        - [C] TreeSet
            - [I] NavigableSet
                - [C] ConcurrentSkipListSet
        - [C] EnumSet
    - [I] Map
        - [C] HashMap
            - [C] LinkedHashMap
        - [C] TreeMap
            - [I] NavigableMap
                - [C] ConcurrentSkipListMap
        - [C] Hashtable
            - [C] Properties
        - [C] WeakHashMap
        - [C] IdentityHashMap
        - [C] ConcurrentHashMap
        - [C] LinkedHashMap
    - [I] SortedMap
        - [C] TreeMap
    - [I] SortedSet
        - [C] TreeSet

- [I] Iterator
    - [I] ListIterator
- [I] Iterable
- [I] Comparator
- [I] Enumeration
- [C] Collections
- [C] Arrays
- [C] AbstractCollection
- [C] AbstractList
- [C] AbstractSequentialList
- [C] AbstractSet
- [C] AbstractQueue
- [I] BlockingQueue
- [I] BlockingDeque
- [C] EnumMap
- [I] Deque
- [I] Queue
- [I] ListIterator
- [I] RandomAccess
- [I] Spliterator


#### Collection interface
### Example 1:

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;

public class CollectionDemoCollection {
    public static void main(String[] args) {
        
        Collection<Integer> list = new ArrayList<Integer>(Arrays.asList(3,6,2,56,78));
        list.add(20);
        list.addAll(new ArrayList<Integer>(Arrays.asList(12,23,34)));
        System.out.println(list.contains(10));
        System.out.println(list.containsAll(new ArrayList<Integer>(Arrays.asList(10,20))));
        list.remove(20);
        // list.removeAll(somelistofelements);
        System.out.println(list.size());
        list.clear();
        System.out.println(list.isEmpty());

        for(int ele : list){
            System.out.println(ele);
        }
    }
}

```


#### List interfcae - The List interface in Java extends the Collection interface and provides additional functionalities that support indexing and positional access to elements.
### Example 2:

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ListDemo {
    public static void main(String[] args) {
        List<Integer> myList = new ArrayList<>(Arrays.asList(3, 6, 2, 56, 78));

        myList.add(20);
        myList.addAll(Arrays.asList(12, 23, 34));

        int elementAtIndex = myList.get(3);
        System.out.println("Element at index 3: " + elementAtIndex);

        myList.set(4, 99);

        System.out.println("Contains 10: " + myList.contains(10));
        myList.remove(20);
        System.out.println("Size: " + myList.size());
        myList.clear();
        System.out.println("Is Empty: " + myList.isEmpty());

        for (int ele : myList) {
            System.out.println(ele);
        }
    }
}
```

#### A Set in Java is an interface that extends the Collection interface. It represents a collection that does not allow duplicate elements. It do not have indexing

### Example 3:

```java

import java.util.HashSet;
import java.util.Set;

public class SetExample {
    public static void main(String[] args) {
        Set<Integer> mySet = new HashSet<>();

        mySet.add(3);
        mySet.add(5);
        mySet.add(7);

        mySet.add(3);
        mySet.add(7);

        System.out.println("Contains 5: " + mySet.contains(5));

        mySet.remove(3);

        System.out.println("Size: " + mySet.size());

        System.out.println("Is Empty: " + mySet.isEmpty());

        for (int element : mySet) {
            System.out.println("Element: " + element);
        }

        mySet.clear();

        System.out.println("Is Empty after clear: " + mySet.isEmpty());
    }
}

// other way
import java.util.Hashtable;
import java.util.Map;

public class DictionaryDemo {
    public static void main(String[] args) {
        Map<String, Integer> students = new Hashtable<>();

        students.put("Sujith", 30);
        students.put("Amith", 45);
        students.put("Chandu", 90);

        System.out.println(students.get("Sujith"));

        System.out.println(students.containsKey("Sujith"));

        for(String name: students.keySet()){
            System.out.println(students.get(name));
        }

        System.out.println(students.size());

        students.clear();
    }    
}
```

# Comparator

## Comparator Interface:
#### Purpose: The Comparator interface is used to define custom comparison logic separate from the objects being compared. It's useful when you need to sort objects in a way that differs from their natural ordering or when the class doesn’t implement Comparable.
#### Usage: You create a Comparator instance to define the comparison logic and use it with sorting methods like Collections.sort() or Arrays.sort().
#### Method: The Comparator interface has a method compare to compare two objects and define the sorting order.

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class ComparatorDemo {
    public static void main(String[] args) {
        List<Integer> marks = new ArrayList<>(Arrays.asList(23, 12, 43, 234));

        Comparator<Integer> com = new Comparator<Integer>() {
            @Override
            public int compare(Integer o1, Integer o2) {
                if (o1 % 10 > o2 % 10) {
                    return 1;
                }
                return -1;
            }
        };

        Collections.sort(marks, com);
    }
}

```

# Comparable

## Comparable Interface:
#### Purpose: The Comparable interface is used to impose a natural ordering on the objects of a class. It defines a method compareTo that enables objects to be compared with each other.
#### Usage: Classes that implement Comparable can be sorted using methods like Collections.sort() or Arrays.sort() without explicitly providing a separate comparator.
#### Method: The compareTo method returns a negative integer, zero, or a positive integer depending on whether the object is less than, equal to, or greater than the specified object.

```java
public class Person implements Comparable<Person> {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public int compareTo(Person otherPerson) {
        return Integer.compare(this.age, otherPerson.age);
    }

    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + '}';
    }

    public static void main(String[] args) {
        List<Person> people = new ArrayList<>();
        people.add(new Person("Alice", 25));
        people.add(new Person("Bob", 20));
        people.add(new Person("Charlie", 30));

        Collections.sort(people); // Sorts by age due to Comparable implementation

        for (Person person : people) {
            System.out.println(person);
        }
    }
}

```

# Streams

```java

list.forEach(n -> sysout(n));

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

public class StreamsDemo {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>(Arrays.asList(20,10,43,23,45,56));
        
        Stream<Integer> stream = list.stream().sorted();
        Stream<Integer> stream2 = stream.filter(n -> n%10==0);
        Stream<Integer> stream3 = stream2.map(n -> n*2);
        System.out.println(stream3.reduce(0, (a,b)-> a+b));
    }
}

```