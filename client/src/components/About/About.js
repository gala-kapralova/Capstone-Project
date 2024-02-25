import './About.scss';
import instruction from '../../assets/images/about.gif';

function About() {
  return (
    <div className="about__container">
      <div className="about__image">
        <img src={instruction} alt="Description of Data Kapellmeister" />
      </div>
      <div className="about__text">
        <p>
          In a world overflowing with data, a new maestro emerges to tame the tumultuous sea of numbers: <span className="tool-name">Data Kapellmeister</span>.
        </p>
        <p>
        This tool isn't just software; it's a vision crafted to transform the overwhelming into the understandable, guiding raw data through a transformative journey into insights.
        </p>
        <p>
          The adventure begins with importing data, akin to gathering musicians for a concert. Then, through the art of wrangling, <span className="tool-name">Data Kapellmeister</span> tunes each dataset, preparing it for the grand exploration where patterns and trends leap from the page like notes off a score, revealing the hidden melodies within the numbers.
        </p>
        <p>
          But the true magic happens in visualization, where data doesn't just inform but sings. Here, charts and graphs become canvases, painting stories that resonate with clarity and insight.
        </p>
        <p>
          Designed for the data-driven maestros of today analysts, scientists, and decision-makers <span className="tool-name">Data Kapellmeister</span> streamlines the journey from data to decision, making it not just efficient but enchanting. In the vast concert hall of information, Data Kapellmeister raises the baton, ready to orchestrate harmony from chaos with elegance and ease.
        </p>
      </div>
    </div>
  );
}

export default About;
