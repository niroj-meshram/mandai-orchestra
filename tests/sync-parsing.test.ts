import { describe, expect, it } from "vitest";
import {
  cleanChannel,
  guessLang,
  singerFromDescription,
  splitTitle,
  titleAvoidingCredit,
  titleCase,
} from "../scripts/sync-playlist.mjs";

// Real titles and description lines from the playlist, as YouTube served them.

describe("splitTitle", () => {
  it("drops bracketed asides before splitting", () => {
    const r = splitTitle(
      "Chumma (Full Video): Rajkummar, Triptii, Pawan Singh, Sachin-Jigar | Vicky Vidya Ka Woh Wala Video",
      "T-Series"
    );
    expect(r.title).toBe("Chumma");
  });

  it("splits on the danda and on II / ll", () => {
    expect(
      splitTitle("Hore Hore । Aa Dongri Ma Re । Kripal Das Manikpuri । Best CG In The Chhattisgarh", "x").title
    ).toBe("Hore Hore");
    expect(
      splitTitle("Son Ke Nathani II सोन के नथनी II Chandan Deep II Diman Sen II Kanchan Joshi", "x").title
    ).toBe("Son Ke Nathani");
  });

  it("drops a trailing CG tag", () => {
    expect(splitTitle("Mai Balaghat Ka Tura CG Viral Song | Santosh Thakrele", "x").title).toBe(
      "Mai Balaghat Ka Tura"
    );
  });

  it("falls back to the channel for the singer, and says so", () => {
    const r = splitTitle("Bhaji Tore La Aabe", "Gorelal Barman - Topic");
    expect(r.singer).toBe("Gorelal Barman");
    // An auto "- Topic" channel is the artist, so not flagged as a guess.
    expect(r.fromChannel).toBe(false);

    const label = splitTitle("Turi Fataka Wo", "DJ Ankit Balaghat");
    expect(label.fromChannel).toBe(true);
  });
});

describe("titleAvoidingCredit", () => {
  it("swaps a title that is really the singer for the real one", () => {
    const { title, segments } = splitTitle(
      "Dilip Lahariya | Rajkumari | Cg song | Dei De O Mola De De Maya - Lyrical Video | Lokesh, Shobhita",
      "KK CASSETTE"
    );
    expect(title).toBe("Dilip Lahariya");
    expect(titleAvoidingCredit(title, segments, "Dilip Lahariya, Rajkumari Chauhan")).toBe(
      "Dei De O Mola De De Maya"
    );
  });

  it("leaves a real title alone", () => {
    expect(titleAvoidingCredit("Turi Fataka O", ["Turi Fataka O"], "Gorelal Barman")).toBe("Turi Fataka O");
  });
});

describe("singerFromDescription", () => {
  it.each([
    ["Singer : Santosh Thakrele", "Santosh Thakrele"],
    ["Singer -   Dilip Lahariya, Rajkumari Chauhan", "Dilip Lahariya, Rajkumari Chauhan"],
    ["Singer                   :- Hemlal Chaturvedi", "Hemlal Chaturvedi"],
    ["Singer:-vinod raja Suman kurrey", "Vinod Raja Suman Kurrey"],
    ["Singer Male: LAXMI NARAYAN PANDEY", "Laxmi Narayan Pandey"],
    ["🎵Singer MONGRA VISHKARMA", "Mongra Vishkarma"],
    ["➤Singer  :- Preetam", "Preetam"],
    ["गायक : प्रीतम पड़वार", "प्रीतम पड़वार"],
    ["singer seema kaushik", "Seema Kaushik"],
    ["Singer(s): Sukhwinder Singh, Alka Yagnik", "Sukhwinder Singh, Alka Yagnik"],
    ["Singer :- Pawan Singh & Indu sonali", "Pawan Singh, Indu Sonali"],
  ])("%s", (line, expected) => {
    expect(singerFromDescription(`Some intro\n${line}\nMusic : Someone`)).toBe(expected);
  });

  it("drops phone numbers", () => {
    expect(singerFromDescription("Singer - Master Sunil Manikpuri - Mo - 9575480629, 8817221991")).toBe(
      "Master Sunil Manikpuri"
    );
  });

  it("ignores other credits that mention vocals", () => {
    expect(
      singerFromDescription(
        "Singer: Dipakshi Kalita, Roshni Saha\nVocal Harmony: Gauranga Shekhar, Pratikhyaa Sarma"
      )
    ).toBe("Dipakshi Kalita, Roshni Saha");
    expect(
      singerFromDescription("Singers: Laxmikant Nandvanshi, Anju Kuldeep\nVocal Recording, Song Mixing: Shivendra")
    ).toBe("Laxmikant Nandvanshi, Anju Kuldeep");
  });

  it("caps long lists", () => {
    expect(singerFromDescription("Singer : A One, B Two, C Three, D Four")).toBe("A One, B Two, C Three & others");
  });

  it("returns nothing when nobody is credited", () => {
    expect(singerFromDescription("Subscribe for more songs!\nMusic: Someone")).toBe("");
  });
});

describe("names", () => {
  it("title-cases shouting and lower-case names, leaves the rest", () => {
    expect(titleCase("LAXMI NARAYAN PANDEY")).toBe("Laxmi Narayan Pandey");
    expect(titleCase("Ratan sabiha")).toBe("Ratan Sabiha");
    expect(titleCase("लक्ष्मी सरगुजिहा")).toBe("लक्ष्मी सरगुजिहा");
  });

  it("cleans channel names", () => {
    expect(cleanChannel("Vivek Sharma - Topic")).toBe("Vivek Sharma");
    expect(cleanChannel("Kripal Das Manikpuri Official")).toBe("Kripal Das Manikpuri");
    expect(cleanChannel("सीमा कौशिक सुपर हिट गाना")).toBe("सीमा कौशिक");
  });
});

describe("guessLang", () => {
  it("prefers Chhattisgarhi signals over a Bhojpuri channel name", () => {
    expect(guessLang("Turi Fataka O", "Bhojpuri Hits")).toBe("cg");
    expect(guessLang("Lahariya Luta A Raja", "Wave Music")).toBe("bhojpuri");
    expect(guessLang("Qayamat Qayamat", "T-Series")).toBe("hindi");
  });
});
