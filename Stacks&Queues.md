# Infix, Postfix, prefix conversions.
``` java
import java.util.*;

public class ExpressionConverter {

    // Helper function to get precedence of operators
    private int getPrecedence(char op) {
        switch (op) {
            case '+': case '-': return 1;
            case '*': case '/': return 2;
            case '^': return 3;
            default: return -1;
        }
    }

    // Infix to Postfix Conversion
    public String infixToPostfix(String expression) {
        StringBuilder result = new StringBuilder();
        Stack<Character> stack = new Stack<>();

        for (char ch : expression.toCharArray()) {
            if (Character.isLetterOrDigit(ch)) {
                result.append(ch);
            } else if (ch == '(') {
                stack.push(ch);
            } else if (ch == ')') {
                while (!stack.isEmpty() && stack.peek() != '(') {
                    result.append(stack.pop());
                }
                stack.pop();
            } else { 
                while (!stack.isEmpty() && getPrecedence(stack.peek()) >= getPrecedence(ch)) {
                    result.append(stack.pop());
                }
                stack.push(ch);
            }
        }

        while (!stack.isEmpty()) {
            result.append(stack.pop());
        }
        return result.toString();
    }

    // Infix to Prefix Conversion
    public String infixToPrefix(String expression) {
        String reversed = new StringBuilder(expression).reverse().toString();
        reversed = reversed.replace('(', '#').replace(')', '(').replace('#', ')');
        String postfix = infixToPostfix(reversed);
        return new StringBuilder(postfix).reverse().toString();
    }

    // Postfix to Infix Conversion
    public String postfixToInfix(String expression) {
        Stack<String> stack = new Stack<>();
        for (char ch : expression.toCharArray()) {
            if (Character.isLetterOrDigit(ch)) {
                stack.push(String.valueOf(ch));
            } else {
                String op2 = stack.pop();
                String op1 = stack.pop();
                stack.push("(" + op1 + ch + op2 + ")");
            }
        }
        return stack.peek();
    }

    // Prefix to Infix Conversion
    public String prefixToInfix(String expression) {
        Stack<String> stack = new Stack<>();
        for (int i = expression.length() - 1; i >= 0; i--) {
            char ch = expression.charAt(i);
            if (Character.isLetterOrDigit(ch)) {
                stack.push(String.valueOf(ch));
            } else {
                String op1 = stack.pop();
                String op2 = stack.pop();
                stack.push("(" + op1 + ch + op2 + ")");
            }
        }
        return stack.peek();
    }

    // Postfix to Prefix Conversion
    public String postfixToPrefix(String expression) {
        Stack<String> stack = new Stack<>();
        for (char ch : expression.toCharArray()) {
            if (Character.isLetterOrDigit(ch)) {
                stack.push(String.valueOf(ch));
            } else {
                String op2 = stack.pop();
                String op1 = stack.pop();
                stack.push(ch + op1 + op2);
            }
        }
        return stack.peek();
    }

    // Prefix to Postfix Conversion
    public String prefixToPostfix(String expression) {
        Stack<String> stack = new Stack<>();
        for (int i = expression.length() - 1; i >= 0; i--) {
            char ch = expression.charAt(i);
            if (Character.isLetterOrDigit(ch)) {
                stack.push(String.valueOf(ch));
            } else {
                String op1 = stack.pop();
                String op2 = stack.pop();
                stack.push(op1 + op2 + ch);
            }
        }
        return stack.peek();
    }

    public static void main(String[] args) {
        ExpressionConverter converter = new ExpressionConverter();
        String infix = "a+b*(c^d-e)^(f+g*h)-i";
        System.out.println("Infix to Postfix: " + converter.infixToPostfix(infix));
        System.out.println("Infix to Prefix: " + converter.infixToPrefix(infix));
        System.out.println("Postfix to Infix: " + converter.postfixToInfix("abcd^e-fgh*+^*+i-"));
        System.out.println("Prefix to Infix: " + converter.prefixToInfix("-+a*b^-^cde+f*ghi"));
        System.out.println("Postfix to Prefix: " + converter.postfixToPrefix("abcd^e-fgh*+^*+i-"));
        System.out.println("Prefix to Postfix: " + converter.prefixToPostfix("-+a*b^-^cde+f*ghi"));
    }
}
```
/**
Approach for Solving Each Conversion:

1. Infix to Postfix:
   - Traverse the expression.
   - Push operators onto a stack based on precedence.
   - Append operands directly to the result.
   - Handle parentheses carefully.

2. Infix to Prefix:
   - Reverse the string.
   - Swap '(' with ')' and vice versa.
   - Apply the infix-to-postfix logic, then reverse the result.

3. Postfix to Infix:
   - Traverse the expression.
   - Push operands onto the stack.
   - For operators, pop two elements from the stack, combine them, and push the result back.

4. Prefix to Infix:
   - Traverse the expression from right to left.
   - Follow the same logic as postfix-to-infix.

5. Postfix to Prefix:
   - Traverse the expression.
   - Push operands onto the stack.
   - For operators, pop two elements, combine them with the operator, and push the result back.

6. Prefix to Postfix:
   - Traverse the expression from right to left.
   - Follow the same logic as postfix-to-prefix.
**/
