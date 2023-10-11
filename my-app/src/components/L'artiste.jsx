import React from "react";
import "../App.css";
import "./app.jsx";
import { GaleryHeader as ArtistHeader } from "./Galery.jsx";

import BiographyImg from "../static/artist-biography.webp";
import InspirationsImg from "../static/artist-inspirations.webp";
import TechnicalImg from "../static/artist-technical.webp";
import GroupImg from "../static/artist-group.webp";
import { Footer } from "./app.jsx";

export function Artiste() {
  return (
    <div className="artist-page">
      <div></div>
      <div>
        <ArtistHeader></ArtistHeader>
        <ArtisteContain></ArtisteContain>
        <Footer></Footer>
        
      </div>
    </div>
  );
}

export function ArtisteContain() {
  return (
    <div className="artist-bloc">
      <p className="artist-title">
        JMDart : couleurs, transparence, matières et effets de lumière.
      </p>

      <div className="biography">
        <div className="text">
          <p className="title">Histoire ...</p>
          <p>JMDart est un artiste toulousain né le 06 janvier 1979.</p>

          <p>
            Dès l’adolescence, il s’initie à la peinture, véritable
            échappatoire, qui se mue rapidement en passion dévorante.
          </p>
          <p>
            Au lycée, la découverte de l’art abstrait est une révélation qui lui
            offre un espace de liberté inégalé.
          </p>
          <p>
            En parallèle de son travail de kinésithérapeute, il développe sa
            propre technique qui s’appuie sur les couleurs, la transparence et
            les volumes.
          </p>
        </div>
        <img src={BiographyImg} alt="artist-biography"></img>
      </div>
      <div className="inspiration">
        <img src={InspirationsImg} alt="artist-inspirations"></img>

        <div className="text">
          <p className="title">Inspirations ...</p>
          <p>
            En mélangeant l’énergie du mouvement et la maîtrise des matériaux,
            ce peintre autodidacte glisse progressivement vers l’abstraction de
            la nature et de la matière.
          </p>
          <p>
            Il joue à déconstruire et recomposer des images du réel, à masquer
            les éléments évidents et à les réinterpréter avec son imaginaire
            pour ne garder que l’essence même de ses sujets et leurs émotions.
          </p>
          <p>
            Il s’inspire des motifs et des formes de la nature, de vues
            aérienne, spatiales ou microscopiques, de revêtements, de sols ou de
            coupes anatomiques.
          </p>
          <p>
            Son travail est aussi basé sur la recherche d’effets de matières, de
            jeux d’association de couleurs et de lumières.
          </p>
          <p>
            Il pousse ainsi les spectateurs à se questionner sur les techniques
            utilisées, l’origine des matériaux, et le rapport entre
            l’abstraction de l’œuvre et la réalité.
          </p>
          <p>
            Ces créations polysémiques sont à la frontière de l’abstrait et du
            figuratif.
          </p>
        </div>
      </div>

      <div className="technical">
        <div className="text">
          <p className="title">Techniques...</p>
          <p>
            JMDart utilise tous types de peintures, de pigments (encre, terre,
            ocre, enduit…), de liants (colle, résine, vernis…), ainsi que des
            matériaux variés (sable, verre, écorce, cendre, roche…).{" "}
          </p>
          <p>
            Les œuvres sont réalisées à base de couches successives de couleurs
            et d’aplats translucides qui ne cachent pas, mais laissent voir
            l’évolution, la transformation et le temps.{" "}
          </p>
          <p>
            Cette multiplication de strates et d’inclusions développent la
            profondeur, les volumes, les nuances de couleur et leur
            transparence.
          </p>
          <p>
            Son travail oscille entre le lâcher-prise et la précision
            obsessionnelle, entre la liberté donnée aux évolutions des matériaux
            et leur contrôle, entre la recherche d’une esthétique globale et
            l’abondance des détails.
          </p>
          <p>
            Pour l’artiste, le sens du toucher est essentiel. Il aime que l’on
            se rapproche d’une œuvre et que l’on puisse ressentir le contact
            avec la matière.
          </p>
          <p>
            Il crée un chaos apparent qui s’avère, en fait, très organisé. Il
            laisse une part au hasard, à l’intuition « évidente » et aux
            évolutions, mais se doit de garder un contrôle et une grande
            concentration pour contenir les substances et rester proche du sujet
            de l’œuvre.
          </p>
        </div>
        <img src={TechnicalImg} alt="artist-technical"></img>
      </div>
      <div className="groups">
        <img src={GroupImg} alt="artist-groups"></img>
        <div className="text">
          <p className="title">Oeuvres...</p>
          <p>
            La seule limite qu’il s’impose est le plan défini par les dimensions
            du support dont il se détache progressivement pour aller vers
            l’espace tridimensionnel.
          </p>
          <p>
            Chaque création est unique et le fruit d’une recherche précise ou
            d’un défi personnel, technique ou pictural. Elle peut parfois
            s’inscrire dans une série de variations.
          </p>
          <p>Les œuvres se répartissent en trois groupes:</p>
          <p>
            les tableaux chromatiques, qui recréent des textures particulières,
            développent différentes associations de couleurs et de formes.
          </p>
          <p>
            les peintures de voyage, qui concentrent l’émotion, les couleurs et
            les images d’une région du monde et utilisent des matériaux
            importés.
          </p>
          <p>
            les œuvres à effets de lumière, qui peuvent s’apprécier avec un
            éclairage naturel, mais prennent tout leur sens sous une lumière
            changeante ou particulière.
          </p>
        </div>
      </div>
    </div>
  );
}
