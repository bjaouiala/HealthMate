package com.healthmate.healthmate.email;

import lombok.Getter;

@Getter
public enum EmailTemplateName {
        CONFIRM_TEMPLATE("confirm_template.html");
    private final String value;


    EmailTemplateName(String value) {
        this.value = value;
    }
}
