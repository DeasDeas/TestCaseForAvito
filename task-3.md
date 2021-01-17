testData {
  testCase1: {
    input: {
      login: "88003553535",
      password: "abcdefghyJCK&*1"
    },
    output: {
      testPassed: true,
    }
  },
  
  testCase2: {
    input: {
      login: "+78003553535",
      password: "LMNopqrstvw(!345"
    },
    output: {
      testPassed: true,
    }
  },
  
  testCase3: {
    input: {
      login: "+78003553535",
      password: "abcdefghwJCK&*1"
    },
    output: {
      testPassed: true,
    }
  },
  
  testCase4: {
    input: {
      login: "+78003553535",
      password: "abcdefghwJCK&*12"
    },
    output: {
      testPassed: false,
    }
  },
  
  testCase5: {
    input: {
      login: "+78003553535",
      password: "abcdefghwJCK&* 12"
    },
    output: {
      testPassed: false,
    }
  },
  
  testCase6: {
    input: {
      login: "+78003553535",
      password: "12345678"
    },
    output: {
      testPassed: true,
    }
  },
  
  testCase7: {
    input: {
      login: "email@mail.com",
      password: "12345678"
    },
    output: {
      testPassed: true,
    }
  },
  
  testCase8: {
    input: {
      login: "email@mail.com",
      password: "1234567"
    },
    output: {
      testPassed: false,
    }
  },
  
  testCase9: {
    input: {
      login: "0123456789012345",
      password: "12345678"
    },
    output: {
      testPassed: false,
    }
  },
  
  testCase10: {
    input: {
      login: "01234567a",
      password: "12345678"
    },
    output: {
      testPassed: false,
    }
  }
}