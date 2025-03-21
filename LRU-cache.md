# LRU Cache Implementation

## Problem Statement
Design a Least Recently Used (LRU) Cache with a given capacity. The cache should support `get(key)` and `put(key, value)` operations efficiently.

## Approach
1. **Use a HashMap for O(1) Access**
   - Store key-value pairs for quick lookup.
2. **Use a Doubly Linked List for Ordering**
   - Maintain the order of elements based on access.
   - The most recently used item moves to the front.
   - The least recently used item is removed from the back when the cache exceeds capacity.
3. **Operations**
   - `get(key)`: If key exists, move it to the front and return value.
   - `put(key, value)`: Insert or update key-value pair and move to the front. If capacity is exceeded, remove the least recently used element from the back.

## Code Implementation
```java
import java.util.*;

class LRUCache {
    class Node {
        int key, value;
        Node prev, next;
        
        Node(int key, int value) {
            this.key = key;
            this.value = value;
        }
    }
    
    private final int capacity;
    private final Map<Integer, Node> cache;
    private final Node head, tail;
    
    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.cache = new HashMap<>();
        
        head = new Node(-1, -1); // Dummy head
        tail = new Node(-1, -1); // Dummy tail
        head.next = tail;
        tail.prev = head;
    }
    
    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    
    private void insertToFront(Node node) {
        node.next = head.next;
        node.prev = head;
        head.next.prev = node;
        head.next = node;
    }
    
    public int get(int key) {
        if (!cache.containsKey(key)) return -1;
        Node node = cache.get(key);
        remove(node);
        insertToFront(node);
        return node.value;
    }
    
    public void put(int key, int value) {
        if (cache.containsKey(key)) {
            remove(cache.get(key));
        }
        
        if (cache.size() == capacity) {
            cache.remove(tail.prev.key);
            remove(tail.prev);
        }
        
        Node newNode = new Node(key, value);
        cache.put(key, newNode);
        insertToFront(newNode);
    }
    
    public static void main(String[] args) {
        LRUCache cache = new LRUCache(2);
        cache.put(1, 1);
        cache.put(2, 2);
        System.out.println(cache.get(1)); // Returns 1
        cache.put(3, 3); // Removes key 2
        System.out.println(cache.get(2)); // Returns -1 (not found)
        cache.put(4, 4); // Removes key 1
        System.out.println(cache.get(1)); // Returns -1 (not found)
        System.out.println(cache.get(3)); // Returns 3
        System.out.println(cache.get(4)); // Returns 4
    }
}
```

## Dry Run Example
### Input
```
LRUCache cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
cache.get(1);
cache.put(3, 3);
cache.get(2);
cache.put(4, 4);
cache.get(1);
cache.get(3);
cache.get(4);
```

### Step-by-Step Execution
| Step | Operation   | Cache State (Most Recently Used -> LRU) |
|------|------------|--------------------------------------|
| 1    | put(1,1)   | [1]                                  |
| 2    | put(2,2)   | [2,1]                                |
| 3    | get(1)     | [1,2]                                |
| 4    | put(3,3)   | [3,1] (Removes 2)                    |
| 5    | get(2)     | -1                                   |
| 6    | put(4,4)   | [4,3] (Removes 1)                    |
| 7    | get(1)     | -1                                   |
| 8    | get(3)     | 3                                    |
| 9    | get(4)     | 4                                    |

### Final Output
```
1
-1
-1
3
4
```
```
