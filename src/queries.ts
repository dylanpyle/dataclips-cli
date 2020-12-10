// Borrowed directly from inspecting network traffic @
// https://data.heroku.com/dataclips/:id
//
// Likely to need updated in the future.

export const fetchClipDetailsQuery = `
query FetchClipDetails($slug: ID!) {
    clip(slug: $slug) {
      ...clipFragment
    }
  }fragment clipFragment on Clip {
  id
  created_at
  creator {
    id
    email
  }
  edited_at
  slug
  title
  user_shares {
    id
    clip_id
    shared_by {
      id
      email
    }
    shared_with {
      id
      email
    }
  }
  team_shares {
    id
    clip_id
    shared_by {
      id
      email
    }
    shared_with {
      id
      name
    }
  }
  team_id
  public_slug
  public_slug_by
  detached
  datasource {
    id
    addon_id
    addon_name
    attachment_id
    attachment_name
    app_id
    app_name
  }
  versions(limit: 1) {
    id
    created_at
    sql
    url
    latest_result_checksum
    latest_result_at
    latest_result_size
    creator_id
    creator {
      email
    }
    result {
      id
      query_started_at
      query_finished_at
      error
      completed_at
      duration
    }
  }
  editable
}
`;

export const updateClipQuery = `
mutation UpdateDataclip($clipId: ID!, $attachmentId: ID, $title: String, $sql: String) {
    updateClip(clipId: $clipId, attachmentId: $attachmentId, title: $title, sql: $sql) {
      ...clipFragment
    }
  }fragment clipFragment on Clip {
  id
  created_at
  creator {
    id
    email
  }
  edited_at
  slug
  title
  user_shares {
    id
    clip_id
    shared_by {
      id
      email
    }
    shared_with {
      id
      email
    }
  }
  team_shares {
    id
    clip_id
    shared_by {
      id
      email
    }
    shared_with {
      id
      name
    }
  }
  team_id
  public_slug
  public_slug_by
  detached
  datasource {
    id
    addon_id
    addon_name
    attachment_id
    attachment_name
    app_id
    app_name
  }
  versions(limit: 1) {
    id
    created_at
    sql
    url
    latest_result_checksum
    latest_result_at
    latest_result_size
    creator_id
    creator {
      email
    }
    result {
      id
      query_started_at
      query_finished_at
      error
      completed_at
      duration
    }
  }
  editable
}
`;
