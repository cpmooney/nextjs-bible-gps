import LetsGo from "./components/lets-go";

export default function GettingStarted() {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="text-center text-2xl h-16 mb-2">Gang Gang!</h2>
        <p className="mb-8">
          We are PUMPED that you are choosing us to partner with you on your
          journey of finding out who you are as a son or daughter of the Living
          God (Rom 8:14) and the mighty works He has given for you to do in the
          earth (Eph 2:10). Brother or sister, all creation is <b>groaning</b>,
          waiting for YOU to understand who YOU really are, according to God's
          awesome word (Rom 8:19) and how much God loves you (Eph 3:16-19).
        </p>
        <p className="mb-8">
          <b className="pr-2">Let's Go!</b>
          You will start off with a collection of common verses. From there
          you're on your own -- feel free to delete verses, modify the fragments
          and make them more personal for you and definitely DEFINITELY plan to
          start adding new verses in the next few days.
        </p>
        <div className="card-actions">
          <LetsGo />
        </div>
        <p className="mb-8 mt-8">
          <b className="pr-2">How do I use this?</b>
          Interact with this app just like you would with a flashcard:
          <ol className="list-decimal list-inside ml-4 mt-4 mb-4">
            <li>Read the fragment listed at the top.</li>
            <li>Guess the citation in your head or out loud.</li>
            <li>Reveal the actual citation.</li>
            <li>
              Tell the app whether you got it correct or not by clicking the
              appropriate button.
            </li>
          </ol>
          When you see a fragment you have never seen before, of course you
          won't know the citation. That's great! Just reveal the actual citation
          and leave it up for a few moments, meditating on it and trying to
          memorize it. When you're done click the Red button (yeah, you got it
          wrong).
        </p>
        <p className="mb-8">
          <b className="pr-2">Be Honest!</b>
          Someday we will have better tools incorporated into the app to help
          you memorize and potentially validate your answers, but for now
          everything is self reported. If you get a citation wrong, don't cry,
          just take a few moments to reflect and correct your memory and then
          click the Red button. Every correct answer will bump the score for
          that card up 1 point and every incorrect answer will drop 10 points
          (not dropping below zero) for that card. Lower score cards will show
          up more frequently than higher score cards. Therefore, if you cheat
          the app into making the score go up without knowing the actual answer,
          you are only cheating yourself in the long run. The app is
          intentionally gamified and seeing your score go up is supposed to be
          fun and get you excited but it's only as meaningful as you make it.
        </p>
        <p className="mb-8">
          <b className="pr-2">Heads Up!</b>
          Because our algorithm is designed to show you verses you don't know
          well more frequently, you will initially see the same verses multiple
          times in a row. That's how it's supposed to work! Once you get the
          first few down, it will add new cards to the deck and you will start
          seeing more interesting decks.  Even later you may still see the same
          card show up multiple times in a row.  Under the hood the decks are
          pretty small (around 15 cards per deck) and since zero-score cards show up
          multiple times, it will be common to see it twice or sometimes even 3
          times in a row.
        </p>
        <p className="mb-8">
          <b className="pr-2">How Do I Memorize?</b>
          In the future we will have tools to help you learn some memorization
          techniques but for now your on your own. The ultimate goal is for you
          to be able to memorize on your own, not relying on any app or
          particular technique. The reason for this is that your brain memorizes
          things in ways that are unique to you. I am a very visual person and
          most of the time I associate a mental picture to the fragment which
          includes the number in the picture somewhere. For example, the face of
          a fox for Matthew 8:20 or the Grand Canyon Horseshoe Bend for Isaiah
          43:19. For others I see mathemtical equations, or have a little chant.
          I even have one where I hear the voice of Yoda and another where I hear
          Darth Vadar (both from the book of Luke which is Star Wars themed).
          They are all quirky and creative and unique to me. But eventually over
          time you will find the little memory hack for the card less and less necessary as
          your brain develops faster and faster neural pathays between the
          fragment and the citation. I found found that you really start to
          notice this when your score gets to around 50.
        </p>
        <div className="card-actions">
          <LetsGo />
        </div>
      </div>
    </div>
  );
}
