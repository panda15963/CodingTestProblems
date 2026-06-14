def solution(arr, l, r):
    N=len(arr)

    s=0
    k_val=0
    for ridx, val in enumerate(arr):
        s+=val
        k_val+=val**2
        if s>=r:
            k_val-=val*(s-r)
            break
    ridx_pos = val-s+r

    s=0
    for lidx,val in enumerate(arr):
        k_val -= val**2
        s+=val
        if s>=l-1:
            k_val += val*(s-l+1)
            break
    lidx_pos = val-s+l-1

    arr.append(0)
    def count_left(lidx, lidx_pos, ridx, ridx_pos):
        v = 0
        ans=0
        while lidx>=0:
            delta = arr[lidx] - arr[ridx]
            m = min(lidx_pos, ridx_pos)
            if delta==0:
                if v==0:
                    ans+=m
            else:
                if m>0 and (v + m*delta)*(v+delta) <=0:
                    if v % delta == 0:
                        ans += 1        
            lidx_pos-=m
            ridx_pos-=m
            v += m*delta
            if lidx_pos == 0:
                lidx -= 1
                lidx_pos = arr[lidx]
            if ridx_pos == 0:
                ridx -= 1
                ridx_pos = arr[ridx]
        return ans

    def count_right(lidx, lidx_pos, ridx, ridx_pos):
        v=0
        if lidx_pos == 0:
            lidx+=1
            lidx_pos = arr[lidx]
        if ridx_pos == 0:
            ridx+=1
            ridx_pos = arr[ridx]

        ans=0
        while ridx<N:
            delta = arr[ridx]-arr[lidx]
            m=min(lidx_pos, ridx_pos)
            if delta==0:
                if v==0:
                    ans+=m
            else:
                if (v+m*delta)*(v+delta) <= 0:
                    if v%delta==0:
                        ans+=1
            lidx_pos -= m
            ridx_pos -= m
            v += m*delta
            if lidx_pos == 0:
                lidx+=1
                lidx_pos = arr[lidx]
            if ridx_pos == 0:
                ridx+=1
                ridx_pos = arr[ridx]
        return ans

    return [k_val ,1+ count_left(lidx,lidx_pos,ridx,ridx_pos) + count_right(lidx, arr[lidx]-lidx_pos, ridx, arr[ridx]-ridx_pos)]