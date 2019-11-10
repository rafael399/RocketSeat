import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Loading,
  Owner,
  IssueList,
  IssueSelector,
  PageSelector,
} from './styles';
import Container from '../../components/Container';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    issueState: [
      { state: 'all', label: 'Todas', active: true },
      { state: 'open', label: 'Abertas', active: false },
      { state: 'closed', label: 'Fechadas', active: false },
    ],
    issueIndex: 0,
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { issueState } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: issueState.find(s => s.active).state,
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  loadIssues = async () => {
    const { match } = this.props;
    const { issueState, issueIndex, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: issueState[issueIndex].state,
        per_page: 5,
        page,
      },
    });

    this.setState({ issues: response.data });
  };

  handleStateClick = async issueIndex => {
    await this.setState({ issueIndex });
    this.loadIssues();
  };

  handlePage = async choice => {
    const { page } = this.state;
    this.setState({ page: choice === 'previous' ? page - 1 : page + 1 });

    this.loadIssues();
  };

  render() {
    const {
      repository,
      issues,
      loading,
      issueState,
      issueIndex,
      page,
    } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          <IssueSelector active={issueIndex}>
            {issueState.map((state, index) => (
              <button
                type="button"
                key={state.label}
                onClick={() => this.handleStateClick(index)}
                className={index === issueIndex ? 'active' : ''}
              >
                {state.label}
              </button>
            ))}
          </IssueSelector>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
          <PageSelector>
            <button
              type="button"
              disabled={page < 2}
              onClick={() => this.handlePage('previous')}
            >
              Anterior
            </button>
            <span>Página {page}</span>
            <button type="button" onClick={() => this.handlePage('next')}>
              Próximo
            </button>
          </PageSelector>
        </IssueList>
      </Container>
    );
  }
}
