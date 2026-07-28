class Solution {
    public String simplifyPath(String path) {
        var arr = path.split("/");
        var d = new ArrayDeque<String>();
        
        for(var p : arr) {
            if(p.isEmpty() || p.equals(".")) continue;
            else if(p.equals("..")) {if(!d.isEmpty()) d.pollLast();}
            else d.addLast(p);
        }
        
        var sb = new StringBuilder();
        while(!d.isEmpty()) {
            sb.append("/");
            sb.append(d.pollFirst());
        }
        
        return sb.isEmpty() ? "/" : sb.toString();
    }
}