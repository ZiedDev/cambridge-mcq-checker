ms=''
ans=''
m=0

def fall():
    input('___')
    exit()

def check_format(s):
    if len(s) != 40:
        print('string length ',len(s))
        fall()
    if len([c for c in s if c not in ['A','B','C','D']]) != 0:
        print('characters not all ABCD')
        fall()

with open('ms.txt', 'r') as f:
    ms=''.join(f.readlines())
    ms=ms.replace(' ','').replace('\n','')
    ms=''.join([c for c in ms if not c.isdigit()]).upper()

with open('answers.txt', 'r') as f:
    ans=f.readline().upper()

check_format(ms)
check_format(ans)

print(ms)
for i in range(40):
    if ans[i] != ms[i]:
        m+=1
        print(f'{i+1}: {ans[i]} --> {ms[i]}')
if m == 0: print('good job')
fall()