# Bible GPS

This app allows the end user to memorize citations based on keywords or scripture verses.  User has ability to create new verse cards.  The app keeps track of their scores per card and offers
up verses with lower scores more frequently than verses with higher scores, introducing new verses (verses with score zero) once the user has mastered verses in the current stack.

# Backstory

This was created after I heard a speaker visit Ramsey who was able to not only quote the bible, but knew the citations.  I realized that I knew a lot of words, phrases, stories, and images
from the bible but I did not know the citations and frequently found myself searching by scratch.  I began walking around with a pile of flashcards with scripture on oneside (sometimes
just kewywords, stories, or images) in my shirt pocket and I spent time memorizing citations based on the keywords.  I realized that most memory solutions I have seen go the other way -
typically they focused on word-for-word memorization given citations.  That wasn't what I was interested in.  I wanted to get to the place where I had a bible in hand and could open the
bible to the location and read it from there on the fly, "sword drill" style.

# Stack

This was my first nextjs app hosted on vercel all created by hand (no AI help!) React/TypeScript frontend with tailwind styling, postgres database backend hosted by neon with drizzle orm.
