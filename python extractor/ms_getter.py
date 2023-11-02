import requests, PyPDF2, json, io, re

pattern = re.compile(" [ABCD] 1")
def parse(st):
    res = ''.join(pattern.findall(st)).replace(' ','')
    res = ''.join([c for c in res if not c.isdigit()])
    if len(res) == 40 or len(res)==30:
        return res
    else: raise ValueError(f"len is {len(res)}")

def handle(subj, c, yr, s, v):
    url=f"https://papers.gceguide.com/Cambridge%20IGCSE/{subj}%20({c})/20{yr}/{c}_{s}{yr}_ms_2{v}.pdf"
    if c=='0653':
        url=f"https://papers.gceguide.com/Cambridge%20IGCSE/Science%20-%20Combined%20(0653)/20{yr}/0653_{s}{yr}_ms_2{v}.pdf"
    if c=='0455':
        url=f"https://papers.gceguide.com/Cambridge%20IGCSE/Economics%20(0455)/20{yr}/0455_{s}{yr}_ms_1{v}.pdf"

    r = requests.get(url)
    f = io.BytesIO(r.content)

    reader = PyPDF2.PdfReader(f)
    pages=reader.pages
    contents = "".join([page.extract_text() for page in pages])
    return parse(contents)

def save(js,code):
    with open(f"{code}.json",'w') as f:
        f.write(json.dumps(js))

subjects = {'Physics':'0625','Biology':'0610','Chemistry':'0620','Combined':'0653','Economics':'0455'}
years = ['17','18','19','20','21','22','23']
session_var = {'m':['2'],'s':['1','2','3'],'w':['1','2','3']}

js={}
for subj in subjects.keys():
    js[subj]={}
    for yr in years:
        js[subj][f"20{yr}"]={}
        for s in session_var.keys():
            #if yr=='22'and s=='w': continue
            js[subj][f"20{yr}"][s]=[None,None,None]
            for v in session_var[s]:
                try:
                    cont = handle(subj, subjects[subj], yr, s, v)
                    js[subj][f"20{yr}"][s][int(v)-1]=cont
                except (PyPDF2.errors.PdfReadError,ValueError) as e:
                    print(f"{subj} {subjects[subj]}_{s}{yr}_2{v} FAILED", e)
                print(f"{subj} {subjects[subj]}_{s}{yr}_2{v}")
save(js,"subjects_ms")