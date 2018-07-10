#!/usr/bin/env bash
cd "`dirname "$0"`"
docObject="{"
for line in $(find ../../src/ -iname '*.jsx'); do
     result=`cat $line | npm run --silent doc 2>/dev/null`
     if [[ ! -z "$result" ]]; then
        mkdir -p `dirname ${line:10:-4}`
        docObject+='"'${line:10:-4}'": '`echo $result`","
     fi
done
echo ${docObject::-1}"}" | ./buildDocs.sh

for line in $(find ../../src/ -iname '*.jsx'); do
    folder=`dirname ${line:10:-4}`
    if [ -d "$folder" ]; then
        rsync -a ${folder%%/*} ../../doc
        rm -r ${folder%%/*}
    fi
done;
