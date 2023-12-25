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
