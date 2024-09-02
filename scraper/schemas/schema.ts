export interface MessagesResponse {
    analytics_id:                string;
    doing_deep_historical_index: boolean;
    total_results:               number;
    messages:                    Array<Message[]>;
}

export interface Message {
    id:                 string;
    type:               number;
    content:            string;
    channel_id:         string;
    author:             Author;
    attachments:        any[];
    embeds:             any[];
    mentions:           Author[];
    mention_roles:      any[];
    mention_everyone:   boolean;
    pinned:             boolean;
    tts:                boolean;
    timestamp:          Date;
    edited_timestamp:   Date | null;
    flags:              number;
    components:         any[];
    hit:                boolean;
    message_reference?: MessageReference;
    position?:          number;
}

export interface Author {
    id:                     string;
    username:               string;
    global_name:            null | string;
    avatar:                 string;
    avatar_decoration_data: null;
    discriminator:          string;
    public_flags:           number;
    clan:                   null;
}

export interface MessageReference {
    type:       number;
    channel_id: string;
    guild_id:   string;
    message_id: string;
}
