### Heaps:

A heap is a specialized binary tree-based data structure. It's a complete binary tree where each node satisfies the heap property. Heaps are mainly used to implement priority queues but are also used in various algorithms due to their efficient nature.

### Min Heap and Max Heap:
1. **Min Heap:** In a min heap, for any given node \(i\) with parent node \(p\) and child nodes \(l\) and \(r\), the value at \(p\) is less than or equal to the values at \(l\) and \(r\). The root node contains the minimum value among all nodes.
2. **Max Heap:** In a max heap, for any given node \(i\) with parent node \(p\) and child nodes \(l\) and \(r\), the value at \(p\) is greater than or equal to the values at \(l\) and \(r\). The root node contains the maximum value among all nodes.

### Operations on Heap:

#### 1. Insertion:
- **Time Complexity:** \(O(\log n)\) - Where \(n\) is the number of elements in the heap.
- To maintain the heap property, the new element is inserted at the bottom-most, rightmost position to maintain the completeness property of the heap. Then, it's bubbled up (or sifted up) until it satisfies the heap property.

#### 2. Deletion:
- **Time Complexity:** \(O(\log n)\) - Where \(n\) is the number of elements in the heap.
- In a min heap, for example, the minimum element (usually the root) is removed. To maintain the heap property after removal, the last element replaces the root and is then sifted down (or bubbled down) to its correct position.

### Heap Sort:
Heap sort is a comparison-based sorting algorithm that leverages the heap data structure. It sorts an array by first creating a heap from the elements and then repeatedly removing the top (minimum or maximum, depending on whether it's a min heap or max heap) element from the heap and placing it at the end of the sorted array.

### Key Steps in Heap Sort:
1. **Build Heap:** Convert the given array into a heap (usually a max heap for heap sort).
2. **Heapify:** Repeatedly remove the top element of the heap and restore the heap property.

### Time Complexity of Heap Sort:
- **Best Case:** \(O(n \log n)\)
- **Average Case:** \(O(n \log n)\)
- **Worst Case:** \(O(n \log n)\)
- The time complexity remains consistent regardless of the input data.

### Summary:
- **Heap:** A specialized binary tree where the root satisfies the heap property.
- **Min Heap & Max Heap:** Different arrangements based on the heap property.
- **Operations:** Insertion and deletion maintain the heap property and have \(O(\log n)\) time complexity.
- **Heap Sort:** Uses a heap to sort elements with a time complexity of \(O(n \log n)\).

Understanding heaps is essential as they find applications in algorithms like Dijkstra's algorithm, heap sort, and priority queues due to their efficient operations and versatile nature.

Youtube Reference Video : https://youtu.be/HqPJF2L5h9U?feature=shared

# Regular Expressions in Java

Regular expressions (regex or regexp) are patterns used to match character combinations in strings. In Java, the `java.util.regex` package provides classes for handling regular expressions.

## Fundamental Concepts

### Pattern Class
- The `Pattern` class defines a regular expression pattern.
- Create a `Pattern` object by compiling a regex pattern using `Pattern.compile()`.

### Matcher Class
- The `Matcher` class is used to match a `Pattern` against a specific string.
- Create a `Matcher` object by calling `matcher()` on a `Pattern` object, passing the string to match.

### Regex Syntax

#### Basic Characters
- `.`: Matches any single character.
- `\`: Escapes a special character.
- `[ ]`: Matches any character within the brackets.
- `[^ ]`: Matches any character NOT within the brackets.
- `|`: Represents OR.

#### Quantifiers
- `*`: Matches zero or more occurrences.
- `+`: Matches one or more occurrences.
- `?`: Matches zero or one occurrence.
- `{n}`: Matches exactly n occurrences.
- `{n,}`: Matches n or more occurrences.
- `{n,m}`: Matches at least n but not more than m occurrences.

#### Character Classes
- `\d`: Matches any digit (equivalent to `[0-9]`).
- `\D`: Matches any non-digit.
- `\w`: Matches any word character (alphanumeric plus underscore).
- `\W`: Matches any non-word character.
- `\s`: Matches any whitespace character.
- `\S`: Matches any non-whitespace character.

## Example Usage - 1

In the following example, regular expressions are used to match digits (`\\d+`) and words (`\\w+`). The Matcher class's `find()` method identifies matches in the text, and `group()` retrieves the matched text.

```java
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexExample {
    public static void main(String[] args) {
        String text = "Hello, this is a sample text with 123 and special characters !@#";

        // Pattern for matching digits
        Pattern digitPattern = Pattern.compile("\\d+");
        Matcher digitMatcher = digitPattern.matcher(text);

        while (digitMatcher.find()) {
            System.out.println("Digits found: " + digitMatcher.group());
        }

        // Pattern for matching words
        Pattern wordPattern = Pattern.compile("\\w+");
        Matcher wordMatcher = wordPattern.matcher(text);

        while (wordMatcher.find()) {
            System.out.println("Word found: " + wordMatcher.group());
        }
    }
}
```

## Example Usage - 2

```java
import java.io.*;
import java.math.*;
import java.security.*;
import java.text.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.function.*;
import java.util.regex.*;
import java.util.stream.*;
import static java.util.stream.Collectors.joining;
import static java.util.stream.Collectors.toList;

class Result {

    // numbers = "0123456789"
    // lower_case = "abcdefghijklmnopqrstuvwxyz"
    // upper_case = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    // special_characters = "!@#$%^&*()-+"
    // string should be minimum of 6 and return the minimum length to satisfy the above criteria

    public static int minimumNumber(int n, String password) {
    // Return the minimum number of characters to make the password strong
    int len=0;
    if(password.matches(".*[0-9].*")){
        len+=1;
        System.out.println("in digits");
    }
    if(password.matches(".*[a-z].*")){
        len+=1;
        System.out.println("in small alpha");
    }
    if(password.matches(".*[A-Z].*")){
        len+=1;
        System.out.println("in large alpha");
    }
    Pattern specialCharPattern = Pattern.compile(".*[-!@#$%^&*()+].*");
    Matcher specialCharMatcher = specialCharPattern.matcher(password);
    if (specialCharMatcher.matches()) {
        len+=1;
        System.out.println("in special char");
    }
    
    if(len==4 && password.length()>=6){
         return 0;
    }
    if(len==4 && password.length()<6){
        return 6-password.length();
    }
    if(len!=4 && password.length()>=6){
        return 4-len;
    }
    if(len!=4 && password.length()<6){
        if(4-len <= 6-password.length())
            return 6-password.length();
        if(4-len > 6-password.length())
            return 4-len;
    }
    return 0;
    }

}

public class Solution {
    public static void main(String[] args) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));

        int n = Integer.parseInt(bufferedReader.readLine().trim());

        String password = bufferedReader.readLine();

        int answer = Result.minimumNumber(n, password);

        bufferedReader.close();
    }
}

```

