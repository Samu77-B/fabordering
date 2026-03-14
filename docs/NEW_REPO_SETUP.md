# Create a new GitHub repo and push this project

Use this when you want a **new** GitHub repository (e.g. for a fresh Hostinger Git connection).

---

## 1. Create the new repo on GitHub

1. Go to **https://github.com/new**
2. **Repository name:** e.g. `teas-cs-pwa` or `teasandcs-ordering` (whatever you prefer)
3. **Description:** optional (e.g. "Teas & C's PWA ordering app")
4. Choose **Private** or **Public**
5. **Do not** check "Add a README", "Add .gitignore", or "Choose a license" — leave the repo **empty**
6. Click **Create repository**

GitHub will show you a page with setup commands. You'll use the repo URL in the next step (e.g. `https://github.com/Samu77-B/teas-cs-pwa.git` or `git@github.com:Samu77-B/teas-cs-pwa.git`).

---

## 2. Point this project at the new repo and push

Open a terminal in your project folder (e.g. `T&C-PWA-Ordering-New-Design`) and run:

**If you're replacing the old remote (one repo only):**
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_NEW_REPO.git
git push -u origin master
```

**If you want to keep the old repo and add the new one as a second remote:**
```bash
git remote add neworigin https://github.com/YOUR_USERNAME/YOUR_NEW_REPO.git
git push -u neworigin master
```

Replace `YOUR_USERNAME` with your GitHub username and `YOUR_NEW_REPO` with the new repo name.

**For a private repo with SSH (e.g. for Hostinger):**
```bash
git remote set-url origin git@github.com:YOUR_USERNAME/YOUR_NEW_REPO.git
git push -u origin master
```

---

## 3. Connect the new repo to Hostinger

1. In **Hostinger** → your site → **Git**
2. If the old repo is already there, delete it (or create a new one)
3. **Create a new repository:**
   - **Repository:**  
     - Public: `https://github.com/YOUR_USERNAME/YOUR_NEW_REPO.git`  
     - Private: `git@github.com:YOUR_USERNAME/YOUR_NEW_REPO.git` (after adding Hostinger’s SSH key as a deploy key on GitHub)
   - **Branch:** `master`
   - **Directory (optional):** `ndo-fabhair`
4. Make sure the `ndo-fabhair` folder on the server is **empty**, then click **Create**
5. After it’s created, click **Deploy** to pull the code

---

## 4. Update the deployment guide (optional)

If you changed the repo name or URL, update `docs/GIT_DEPLOY_HOSTINGER.md` and replace any old repo URL with your new one.
