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