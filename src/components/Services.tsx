const services = [
  {
    title: "Positioning & strategy",
    problem: "“People don’t quite get what we do.”",
    body: "Find the center of the business and give it a clear place in the market. Shape the offer, the audience, the message, and the reasons to believe.",
    outputs: "Positioning · Offer structure · Messaging · Narrative strategy",
  },
  {
    title: "Web & digital experiences",
    problem: "“Our presence undersells our work.”",
    body: "Build a digital experience that reflects the actual quality of the company. Connect the story, the proof, and the path from interest to inquiry.",
    outputs: "Websites · Landing pages · Digital products · Customer journeys",
  },
  {
    title: "AI & practical systems",
    problem: "“There has to be a better way to do this.”",
    body: "Find where modern tools can remove friction and make the team more capable. Build useful workflows and tools around the people who will use them.",
    outputs: "Knowledge systems · AI workflows · Internal tools · Automation",
  },
  {
    title: "Creative & growth assets",
    problem: "“We have the substance. It isn’t reaching people.”",
    body: "Give valuable work a public life. Turn evidence, expertise, and ideas into the media, campaigns, and sales assets that help people pay attention and act.",
    outputs: "Media properties · Proof packaging · Campaigns · Sales assets",
  },
];
export function Services() {
  return (
    <section id="services" className="services-section shell">
      <div className="services-intro">
        <p className="eyebrow">03 / What we build</p>
        <h2>
          One problem.
          <br />
          Several kinds
          <br />
          of thinking.
        </h2>
        <p>
          Strategy, creative work, technology, and execution belong in the same
          conversation. The constraint tells us where to start.
        </p>
      </div>
      <div className="services-accordions">
        {services.map((service, i) => (
          <details className="service" key={service.title} open={i === 0}>
            <summary>
              <span className="folio">0{i + 1}</span>
              <div>
                <span className="service-problem">{service.problem}</span>
                <h3>{service.title}</h3>
              </div>
              <span className="service-plus" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="service-details">
              <p>{service.body}</p>
              <p className="service-outputs">{service.outputs}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
