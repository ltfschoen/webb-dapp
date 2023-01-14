#!/bin/bash
# Copyright 2015-2020 Parity Technologies (UK) Ltd.

if [[ "$OSTYPE" == "linux-gnu" ]]; then
	set -e
	if [[ $(whoami) == "root" ]]; then
		MAKE_ME_ROOT=
	else
		MAKE_ME_ROOT=sudo
	fi

  echo "Updating package information and installing dependencies."
  export DEBIAN_FRONTEND=noninteractive
  apt-get -y update
  apt-get install -y curl jq wget
elif [[ "$OSTYPE" == "darwin"* ]]; then
	set -e
	echo "Mac OS (Darwin) detected."

	if ! which brew >/dev/null 2>&1; then
		/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
	fi

  echo "Updating Homebrew and installing dependencies."
	brew update -v
	brew install curl jq wget
  xcode-select --install
else
	echo "Unknown operating system."
	echo "This OS is not supported with this script at present. Sorry. Please install dependencies manually."
	echo "Please refer to https://github.com/webb-tools/webb-dapp/blob/develop/docker/REAMDE.md for setup information."
	exit 1
fi
