#include <bits/stdc++.h>
using namespace std;

int main()
{
    int t;
    cin >> t;
     int temp;
    int sum;

    for(int i=0;i<t;i++)
    {
        int x, k,o;
        cin >> x >> k;
        o= x;
       sum = 0;
       int ans;
        while (x != 0)
        {

            temp = x % 10;
            sum += temp;
            x -= temp;
            x /= 10;
        }

        
        if(sum%k==0) cout<<o<<endl;   
       
     else {
                    
                   o++;
                     int l=o;
                   while(true) {
                   int s=o;
                     while (o != 0)
        {

            temp = o % 10;
            s += temp;
            o -= temp;
            o /= 10;
        }
       if (s%k==0) {ans =l;break;}
       else  {o=l+1;}
                   }
        cout<<ans-1<<endl;
                }
            

        
    
    return 0;
}