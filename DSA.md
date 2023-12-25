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