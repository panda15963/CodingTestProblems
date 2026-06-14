# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def pairSum(self, head: Optional[ListNode]) -> int:
        # Store all node values in a list
        values = []
      
        # Traverse the linked list and collect all values
        current = head
        while current:
            values.append(current.val)
            current = current.next
      
        # Get the total number of nodes
        n = len(values)
      
        # Find the maximum twin sum
        # Twin pairs are: (0, n-1), (1, n-2), ..., (n/2-1, n/2)
        # We iterate through the first half and pair with corresponding element from the end
        max_twin_sum = max(values[i] + values[n - 1 - i] for i in range(n // 2))
      
        return max_twin_sum