// Télécharge une fois les photos de couvertures depuis Open Library et les range dans covers/.
// Le site les sert ensuite lui-même : plus d'attente à chaque visite.
// Usage, depuis la racine du site :  node outils/couvertures.mjs   (Node 18 ou plus)
import { mkdir, writeFile, access } from 'node:fs/promises';

const ISBN = ["9780385474542", "9782842612894", "9782020259217", "9782020525718", "9782266108157", "9782264036933", "9782708704558", "9780307455925", "9781400095209", "9782070360024", "9782070360420", "9782070322886", "9782253096344", "9782070408504", "9780060883287", "9782070368228", "9780451526342", "9780060850524", "9780553293357", "9780553382563", "9780441172719", "9780132350884", "9780137081073", "9780735619678", "9780132126953", "9780133591620", "9780262033848", "9780201633610", "9780062316097"];
await mkdir('covers', { recursive: true });

let ok = 0;
const manquants = [];
for (const isbn of ISBN) {
    const fichier = `covers/${isbn}.jpg`;
    try { await access(fichier); ok++; continue; } catch { /* pas encore téléchargée */ }
    try {
        const rep = await fetch(`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`, { redirect: 'follow' });
        const octets = Buffer.from(await rep.arrayBuffer());
        if (!rep.ok || octets.length < 2000) { manquants.push(isbn); continue; }
        await writeFile(fichier, octets);
        ok++;
        console.log(`OK  ${isbn}  ${Math.round(octets.length / 1024)} ko`);
    } catch (e) {
        manquants.push(isbn);
    }
}
console.log(`\n${ok} couvertures dans covers/.`);
if (manquants.length) console.log(`Pas de photo pour : ${manquants.join(', ')} (ces livres gardent leur couverture en toile).`);
