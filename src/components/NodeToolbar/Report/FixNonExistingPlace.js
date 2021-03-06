// @flow
import * as React from 'react';
import strings from './strings';


type Props = {
  featureId: number,
  onClose: (() => void),
};


export default class ReportProblemButton extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.trapFocus = this.trapFocus.bind(this);
  }

  componentDidMount() {
    this.editLink.focus();
  }

  trapFocus({nativeEvent}) {
    if (nativeEvent.target === this.howToLink && nativeEvent.key === 'Tab' && nativeEvent.shiftKey) {
      nativeEvent.preventDefault();
      this.backButton.focus();
    }
    if (nativeEvent.target === this.backButton && nativeEvent.key === 'Tab' && !nativeEvent.shiftKey) {
      nativeEvent.preventDefault();
      this.howToLink.focus();
    }
  }

  render() {
    if (!this.props.featureId) return null;

    const url = `https://www.openstreetmap.org/edit?node=${this.props.featureId}`;

    const {
      osmRemoveHint,
      osmPermanentlyClosedHint,
      osmPermanentlyClosedHowtoLinkCaption,
      osmLoginHint,
      editButtonCaption,
      backButtonCaption,
    } = strings();

    return (
      <section
        role="dialog"
        aria-labelledby="osm-remove-hint osm-permanently-closed-hint osm-login-hint"
      >
        <p id="osm-remove-hint">{osmRemoveHint}</p>
        <p id="osm-permanently-closed-hint">{osmPermanentlyClosedHint} (
          <a
            href="https://wiki.openstreetmap.org/wiki/Key:disused:"
            ref={howToLink => this.howToLink = howToLink}
          >
            {osmPermanentlyClosedHowtoLinkCaption}
          </a>
        )</p>
        <p className="subtle" id="osm-login-hint">{osmLoginHint}</p>
        <a href={url} className="link-button" ref={editLink => this.editLink = editLink} onKeyDown={this.trapFocus}>
          {editButtonCaption}
        </a>
        <button
          className="link-button negative-button"
          onClick={this.props.onClose}
          ref={backButton => this.backButton = backButton}
          onKeyDown={this.trapFocus}
        >
          {backButtonCaption}
        </button>
      </section>
    );
  }
}
