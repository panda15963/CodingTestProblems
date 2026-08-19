import java.math.BigInteger;
class Solution {
    public int compareVersion(String version1, String version2) {
        String[] arr1 = version1.split("[.]");
        String[] arr2 = version2.split("[.]");

        BigInteger b1 = new BigInteger("0");
        BigInteger b2 = new BigInteger("0");

        for(int i = 0; i < (arr1.length > arr2.length ? arr1.length : arr2.length); i++)
        {
            if(i >= arr1.length)
            {
                b1 = BigInteger.valueOf(0);
            }
            else
            {
                b1 = new BigInteger(arr1[i]);
            }

            if(i >= arr2.length)
            {
                b2 = BigInteger.valueOf(0);
            }
            else
            {
                b2 = new BigInteger(arr2[i]);
            }

            if(b1.compareTo(b2) > 0)
            {
                return 1;
            }
            else if(b1.compareTo(b2) < 0)
            {
                return -1;
            }
        }

        return 0;
    }
}