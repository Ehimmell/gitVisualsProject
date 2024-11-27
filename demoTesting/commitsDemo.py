import requests

multiResponse = requests.get("http://localhost:8080/api/commits?repo=Hello-World&owner=octocat")

data = multiResponse.json()

shas = []

i = 0

for _ in data:
    for commit in _:
        if 'sha' in commit:
            shas.append(commit['sha'])
            print(i, commit['sha'])
            i += 1


selected = int(input("Select a commit: "))

if selected < len(shas):
    print(
        requests.get(
            f"http://localhost:8080/api/commit?repo=Hello-World&owner=octocat&sha={shas[selected]}"
        ).json()
    )
